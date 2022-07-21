import { Notes, DetailReturn } from "./interface";

export class ElectricDetail {
  id: number;
  index: number;
  notelist: Notes[];
  currentNote: Notes;
  price: number = 1557.64;
  lastCharge: string = "Last Charge";

  constructor(id: number, notelist: Notes[]) {
    this.notelist = notelist;
    this.id = id;
    this.currentNote = notelist.filter((x) => x["id"] == id)[0];
    this.index = notelist.indexOf(this.currentNote);
  }

  static dayRangeCounter(startDate: any, endDate: any): DetailReturn {
    return {
      value: endDate.diff(startDate, "days"),
      datasets: {
        seconds: endDate.diff(startDate, "seconds"),
      },
    };
  }

  static async isToday(date: string): Promise<boolean> {
    const dayjs = (await import("dayjs")).default;
    return dayjs(date).isSame(dayjs(), "day");
  }

  async todayRange(): Promise<DetailReturn> {
    const dayjs = (await import("dayjs")).default;
    var range = ElectricDetail.dayRangeCounter(
      dayjs(this.currentNote["time"]),
      dayjs()
    );
    var sameDay: boolean = await ElectricDetail.isToday(
      this.currentNote["time"]
    );

    return {
      text:
        range.value == 0
          ? sameDay
            ? "Today"
            : "Yesterday"
          : range.value < 0
          ? `${-range.value} days later`
          : `${range.value} days ago`,
      value: range.value,
      datasets: {
        seconds: range.datasets.seconds,
      },
    };
  }

  async nextChargeRange(): Promise<DetailReturn> {
    const dayjs = (await import("dayjs")).default;
    var range: number =
      this.index != 0
        ? ElectricDetail.dayRangeCounter(
            dayjs(this.currentNote["time"]),
            dayjs(this.notelist[this.index - 1]["time"])
          ).value
        : 0;

    return {
      text: range != 0 ? `${range} days before next charge` : this.lastCharge,
      value: range != 0 ? range : 0,
    };
  }

  async kwhPerDay(): Promise<DetailReturn> {
    if (this.index === 0) return { text: this.lastCharge, value: 0 };

    const Decimal = (await import("decimal.js-light")).default;
    const nextRange = await this.nextChargeRange();
    var result: string = new Decimal(this.currentNote.lastsize)
      .minus(this.notelist[this.index - 1].firstsize)
      .div(nextRange.value == 0 ? 1 : nextRange.value)
      .toFixed(2);

    return { text: `${result} kWh/day`, value: parseFloat(result) };
  }

  async pricePerDay(): Promise<string> {
    if (this.index === 0) return this.lastCharge;

    const Decimal = (await import("decimal.js-light")).default;
    const kwhPerDay = await this.kwhPerDay();
    var result: string = new Decimal(kwhPerDay.value.toFixed(2))
      .times(this.price.toFixed(2))
      .toFixed();

    return this.toRupiah(parseFloat(result));
  }

  async getPrice(): Promise<string> {
    const Decimal = (await import("decimal.js-light")).default;
    return this.toRupiah(
      parseFloat(
        new Decimal(this.currentNote["size"].toString())
          .times(this.price.toString())
          .toFixed(2)
      )
    );
  }

  toRupiah(value: number): string {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }
}
