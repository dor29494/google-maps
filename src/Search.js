import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const Search = ({setContactInfo,contactInfo}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 32.073582, lng: () => 34.788052 },
      radius: 100 * 1000,
    },
  });
  //   const options = data.map(({id,des}) => {
  //     const firstLetter = option.title[0].toUpperCase();
  //     return {
  //       firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //       ...option,
  //     };
  //   });
  const locationsData = data.map(({ place_id, description }) => ({
    id: place_id,
    desc: description,
  }));

  const selectedHandler = async (e) => {
    setValue(e.target.defaultValue, false);
    clearSuggestions();
    try {
      const results = await getGeocode({
        address: e.target.defaultValue,
      });
      const { lat, lng } = await getLatLng(results[0]);
      let userData = contactInfo
      userData.lat = lat;
      userData.lng = lng
      setContactInfo(userData)
      // panTo({ lat, lng });
      // mapRef.current.setZoom(20)

    } catch (err) {
      console.log("error" , err);
    }
  }
  return (
    <div>
      <Autocomplete
        id="grouped-demo"
        options={status === "OK" ? locationsData : []}
        getOptionLabel={(options) => options.desc}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Location"
            variant="outlined"
            onChange={(e) => setValue(e.target.value)}
            onSelect={selectedHandler}
          />
        )}
      />
    </div>
  );
};

export default Search;
