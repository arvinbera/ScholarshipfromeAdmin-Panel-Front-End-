export default class BaseCore {

    public static ModelConvertToUrl(model: any): String {
        if (!model) {
            return model;
        }
        let url = "?";
        for (var key in model) {
            url += key + "=" + model[key] + "&";
        }
        return url.slice(0, -1);
    }


    public static ToFormData(data: any) {
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        return formData;
    }

    public static EnumValue<T, V, D>(list: T[], value: V): D {
        let items = list as any[];
        var data = items.find(i => i.Name === value);
        return data?.Value as D;
    }

    public static ToDecimal(value: any) {
        value = value ?? 0;
        return value.toFixed(2);
    }

    public static CopyModel<S, T>(data: S, model: T): T {
        if (!data || !model) {
            return null as unknown as T;
        }

        let propertys = Array<any>();
        for (let k in data) {
            propertys.push({ Name: k, Value: data[k] });
        }

        let newModel = model as any;
        for (let key in model) {
            let value = propertys.find(i => i.Name === key)?.Value;
            newModel[key] = value ?? null;
        }
        return newModel as T;
    }

    public static ObjectAssign<T1, T2, T3>(value1: T1, value2: T2): T3 {
        return Object.assign(value1 ?? {}, value2 ?? {}) as T3;
    }

    public static ToEnumList<T>(enums: any): T[] {
        let list = Array<any>();
        for (let key in enums) {
            if (!list.find(i => i.value === key || i.name === key)) {
                list.push({ name: enums[key], value: Number(key) });
            }
        }
        return list as T[];
    }

}

// class Property {
//     Name?: string;
//     Value?: any;
// }