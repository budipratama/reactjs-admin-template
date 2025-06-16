import BasicSelect from "../../components/BasicSelect";
import AdvancedSelect from "../../components/AdvancedSelect";
import { JSX, useCallback, useState } from "react";

const AutoComplete = (): JSX.Element => {
  const [countryApi, setCountryApi] = useState<any[]>([]);
  const [countryApi2, setCountryApi2] = useState<any[]>([]);

  const fields = {
    country: "",
    countries: [] as string[],
    gender: "",
    hobbies: [] as string[],
  };
  const [formData, setFormData] = useState<{ [key: string]: any }>(fields);
  const { gender, country, hobbies, countries } = formData;
  console.log("[AutoComplete] formData", formData);
  const handleCountrySearch = useCallback(async (search: string) => {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`
    );
    const data = await res.json();
    if (Array.isArray(data)) {
      setCountryApi(data);
    } else {
      setCountryApi([]);
    }
  }, []);

  const handleCountrySearch2 = useCallback(async (search: string) => {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`
    );
    const data = await res.json();
    if (Array.isArray(data)) {
      setCountryApi2(data);
    } else {
      setCountryApi2([]);
    }
  }, []);
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
      }}>
      <h2>Autocomplete</h2>
      <div>
        <h3>Basic</h3>
        <hr />
        <BasicSelect
          name='gender'
          label='Gender'
          value={gender}
          onChange={(val: any) => setFormData({ ...formData, gender: val })}
          errorMessage=''
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />

        <BasicSelect
          name='hobbies'
          label='Hobbies'
          value={hobbies}
          onChange={(val: any) => setFormData({ ...formData, hobbies: val })}
          errorMessage=''
          options={[
            { label: "Biker", value: "bike" },
            { label: "Reading", value: "reading" },
            { label: "Swimming", value: "swimming" },
          ]}
          multiple={true}
        />
      </div>

      <div>
        <h3>Advanced</h3>
        <hr />
        <AdvancedSelect
          name='country'
          label='Country'
          value={country}
          onChange={(val: any) => setFormData({ ...formData, country: val })}
          errorMessage=''
          minSearchLength={1}
          onSearch={handleCountrySearch}
          rawOptions={countryApi}
          optionMapper={(item: any) => ({
            label: item.name?.common || item.name || "",
            value:
              item.cca2 || item.cca3 || item.name?.common || item.name || "",
          })}
        />

        <AdvancedSelect
          name='countries'
          label='Countries'
          value={countries}
          onChange={(val: any) => setFormData({ ...formData, countries: val })}
          errorMessage=''
          minSearchLength={1}
          onSearch={handleCountrySearch2}
          rawOptions={countryApi2}
          optionMapper={(item: any) => ({
            label: item.name?.common || item.name || "",
            value:
              item.cca2 || item.cca3 || item.name?.common || item.name || "",
          })}
          multiple={true}
          placeholder='Search countries...'
        />
      </div>
    </div>
  );
};

export default AutoComplete;
