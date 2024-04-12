import * as fs from "fs";
import xml2js from "xml2js";
import commonjsVariables from "commonjs-variables-for-esmodules";
// @ts-ignore
const { __dirname } = commonjsVariables(import.meta);

export default class XmlService {


  async readXMlAndGetJSON(link: string) {
    const directory = __dirname.split("service")[0] + "data/" + link;
    const inFile = fs.readFileSync(directory);

    const parser = new xml2js.Parser(/* options */);
    return parser.parseStringPromise(inFile);
  }

  /* XML to JSON */

  /* static data */
  /* получить регионы */
  async getRegionList() {
    const list = await this.readXMlAndGetJSON("region.xml");
    const json_data = list["data"]["region"];
    const data = [];

    for (let i = 0; i < json_data.length; i++) {
      const item = json_data[i];
      const id = item["$"];
      const title = item.title[0];
      data.push({
        ...id, title
      });
    }
    return data;
  }

  /* получить города */
  async getCityList(regions: any) {
    const list = await this.readXMlAndGetJSON("city.xml");
    const json_data = list["data"]["regionId"];
    const data = [];

    for (let i = 0; i < json_data.length; i++) {
      const item = json_data[i];
      const region = item["$"];
      const cityList = item["city"];

      const result = {
        ...region,
        cityList: []
      };

      const initCityItems = () => {
        for (let j = 0; j < cityList.length; j++) {
          const city = cityList[j];
          const id = city["$"]["id"];
          const title = city.title[0];
          const city_ = {
            id, title
          };
          result.cityList.push(city_);
        }
        data.push(result);
      };

      if (!regions?.length || regions.includes(result.region)) {
        initCityItems();
      }
    }

    return data;
  }

  /* получить районы */
  async getDistrictList(regions: any, cities: any) {
    const list = await this.readXMlAndGetJSON("district.xml");
    const json_data = list["data"]["regionId"];
    const data = [];

    for (let i = 0; i < json_data.length; i++) {
      const item = json_data[i];
      const region = item["$"];
      const cityIdList = item["cityId"];

      const result = {
        ...region,
        cityList: []
      };

      const initCityIdList = () => {
        for (let j = 0; j < cityIdList.length; j++) {
          const cityList = cityIdList[j];
          const cityId = cityList["$"];
          const districtList = cityList["district"];

          const cityDistrictResult = {
            ...cityId,
            districtList: []
          };

          const initDistrictList = () => {
            for (let k = 0; k < districtList.length; k++) {
              const district = districtList[k];
              const districtId = district["$"];
              const districtModel = {
                ...districtId,
                type: district.type[0],
                title: district.title[0]
              };
              cityDistrictResult.districtList.push(districtModel);
            }
          };
          if (!cities?.length || cities.includes(cityDistrictResult.id)) {
            initDistrictList();
            result.cityList.push(cityDistrictResult);
          }
        }
        if (!regions?.length || regions.includes(result.region)) {
          data.push(result);
        }
      };
      initCityIdList();
    }
    return data;
  }

  /* dynamic data */
}