import BasicSelect from "../../components/BasicSelect";
import AdvancedSelect from "../../components/AdvancedSelect";
import { JSX, useCallback, useState } from "react";

const AutoComplete = (): JSX.Element => {
  const [countryApi, setCountryApi] = useState<any[]>([]);

  const fields = {
    country: "",
    gender: "",
  };
  const [formData, setFormData] = useState<{ [key: string]: string }>(fields);
  const { gender, country } = formData;
  console.log("formData", formData);
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
          onChange={(val: string) => setFormData({ ...formData, gender: val })}
          errorMessage=''
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />
      </div>

      <div>
        <h3>Advanced</h3>
        <hr />
        <AdvancedSelect
          name='country'
          label='Country'
          value={country}
          onChange={(val: string) => setFormData({ ...formData, country: val })}
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
      </div>
    </div>
  );
};

export default AutoComplete;
