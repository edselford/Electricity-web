import { DetailReturn, Notes } from "./interface";

export class ElectricManager {
  notelist: Notes[];
  price: number = 1557.64;

  constructor(data: Notes[]) {
    this.notelist = data;
  }

  async beforeTodayList(): Promise<Notes[]> {
    const dayjs = (await import("dayjs")).default;
    return this.notelist.filter(
      (note) => dayjs().diff(dayjs(note.time), "hours") >= 0
    );
  }

  async avgUsage(): Promise<number> {
    const Decimal = (await import("decimal.js-light")).default;

    if (this.notelist.length > 2) {
      var eachUsage: Array<any> = [];
      var avgUsage: number;

      var beforeToday: Notes[] = await this.beforeTodayList();

      if (beforeToday.length == 0) {
        avgUsage = 0;
      } else {
        beforeToday.shift();
        const { ElectricDetail } = await import("./detail_models");
        for (var note of beforeToday) {
          const res = await new ElectricDetail(
            note.id,
            this.notelist
          ).kwhPerDay();
          eachUsage.push(new Decimal(res.value));
        }
      }
      avgUsage = parseFloat(
        eachUsage
          .reduce((a, b) => a.plus(b))
          .div(eachUsage.length)
          .toFixed(2)
      );
    } else {
      avgUsage = 0;
    }

    return avgUsage;
  }

  async estimateAmount(): Promise<string> {
    const Decimal = (await import("decimal.js-light")).default;

    var beforeToday: Notes[] = await this.beforeTodayList();

    if (beforeToday.length == 0 || beforeToday == undefined) {
      return "0";
    }

    const latest: Notes = beforeToday.shift()!;

    const { ElectricDetail } = await import("./detail_models");
    const todayRange = await new ElectricDetail(
      latest.id,
      this.notelist
    ).todayRange();

    if (beforeToday.length == 0) {
      return "0";
    } else if (beforeToday.length == 1) {
      const usage = await new ElectricDetail(
        beforeToday[0].id,
        this.notelist
      ).kwhPerDay();
      return new Decimal(latest.lastsize)
        .minus(usage.value)
        .times(todayRange.datasets.seconds)
        .toFixed(2);
    }
    const avgUsage = await this.avgUsage();
    const result = new Decimal(latest.lastsize).minus(
      new Decimal(avgUsage).times(
        new Decimal(todayRange.datasets.seconds).div(60 * 60 * 24).toFixed(5)
      )
    );

    return parseFloat(result.toFixed()) < 0 ? "0" : result.toFixed(5);
  }

  async pricePerDay(): Promise<string> {
    const Decimal = (await import("decimal.js-light")).default;
    const avgUsage = await this.avgUsage();
    return new Decimal(avgUsage).times(this.price).toFixed(2);
  }

  async estimateElectricLong(): Promise<DetailReturn> {
    const estimate = await this.estimateAmount();
    const avgUsage = await this.avgUsage();
    const Decimal = (await import("decimal.js-light")).default;
    const value = parseFloat(new Decimal(estimate).div(avgUsage).toFixed(5));

    const day: number = Math.floor(value);
    const hours: number = Math.floor(
      parseFloat(new Decimal(value).modulo(1).times(24).toFixed())
    );
    const minutes: number = Math.floor(
      parseFloat(
        new Decimal(value).modulo(1).times(24).modulo(1).times(60).toFixed()
      )
    );
    const seconds: number = parseFloat(
      new Decimal(value)
        .modulo(1)
        .times(24)
        .modulo(1)
        .times(60)
        .modulo(1)
        .times(60)
        .toFixed(0)
    );

    const text = `${day} day, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    return {
      text,
      value,
      datasets: {
        day,
        hours,
        minutes,
        seconds,
      },
    };
  }

  async getLabels(): Promise<{
    labels: string[];
    data: { usage: number[]; lastsize: number[] };
  }> {
    const dayjs = (await import("dayjs")).default;

    var labels: string[] = this.notelist
      .slice(1, 11)
      .map((note) => dayjs(note["time"]).format("D MMM"));

    const { ElectricDetail } = await import("./detail_models");

    const usage: number[] = await Promise.all(
      this.notelist.slice(1, 11).map(async (note) => {
        return (await new ElectricDetail(note["id"], this.notelist).kwhPerDay())
          .value;
      })
    );

    const lastsize: number[] = this.notelist
      .slice(1, 11)
      .map((note) => parseFloat(note["lastsize"]));

    return { labels, data: { usage, lastsize } };
  }
}
