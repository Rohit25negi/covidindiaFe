export interface StateCovid{
    state_id: Number
    state_name: string
    total_corona_cases: Number
    confirmed_corona_cases: Number
    recovered_corona_cases: Number
    deaths_corona_cases: Number
}

export interface Deserializable {
    deserialize(input: any): this;
  }

export class StateWiseCovid implements Deserializable {
    state_id: Number
    state_name: string
    total_corona_cases: Number
    confirmed_corona_cases: Number
    recovered_corona_cases: Number
    deaths_corona_cases: Number

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}