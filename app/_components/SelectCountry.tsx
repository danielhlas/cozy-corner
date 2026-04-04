import { getCountries } from '@/app/_lib/data-service';

type CountryType = {
  name: string,
  flag: string,
  independent: boolean
}

type SelectCountryProps = {
  defaultCountry: CountryType,
  name: string,
  className: string
}

async function SelectCountry({ defaultCountry, name, className }: SelectCountryProps) {
  const countries: CountryType[] = await getCountries();
  console.log("countries", countries);
  const flag =
    countries.find((country) => {
      return country.name === defaultCountry.name
    })?.flag ?? '';

  return (
    <select
      name={name}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
