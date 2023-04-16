export default function capitalizeFirstLetter(string:string) {
    return string && string!=="" && string.charAt(0).toUpperCase() + string.slice(1)  || "";
  }