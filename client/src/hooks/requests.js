const baseUrl = "http://localhost:8000";
async function httpGetPlanets() {
  const response = await fetch(`${baseUrl}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${baseUrl}/launches`);
  const launches = await response.json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${baseUrl}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${baseUrl}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
