import BasicSelect from "../../components/BasicSelect";
import AdvancedSelect from "../../components/AdvancedSelect";
import { JSX, useCallback, useState } from "react";

const AutoComplete = (): JSX.Element => {
  const [countryApi, setCountryApi] = useState<any[]>([]);
  const [countryApi2, setCountryApi2] = useState<any[]>([]);

  const fields = {
    country: undefined,
    countries: [],
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
  console.log("[AutoComplete] formData", formData);
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
      }}>
      {/* {<ReactMarkDown>{readmeContent}</ReactMarkDown>} */}
      <div
        style={{
          borderBottom: "1px solid #ccc",
        }}>
        <h2>Autocomplete</h2>
      </div>
      <div>
        <h3>Basic</h3>
        <hr />
        <BasicSelect
          name='gender'
          label='Gender'
          value={typeof gender === "string" ? gender : ""}
          onChange={(val: any) => {
            console.log("event change gender", val);
            setFormData((prev) => {
              console.log("gender prev formData:", prev, val);
              return { ...prev, gender: val };
            });
          }}
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
          value={Array.isArray(hobbies) ? hobbies : []}
          onChange={(val: any) => {
            console.log("event change hobbies", val);
            setFormData((prev) => {
              console.log("hobbies prev formData:", prev, val);
              return { ...prev, hobbies: val };
            });
          }}
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
          onChange={(val: any) =>
            setFormData((prev) => ({ ...prev, country: val }))
          }
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
          onChange={(val: any) =>
            setFormData((prev) => ({ ...prev, countries: val }))
          }
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
