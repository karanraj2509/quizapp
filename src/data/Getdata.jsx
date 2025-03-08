function Getdata() {
  const URL = `https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`;
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => response.results);
}

export default Getdata;
