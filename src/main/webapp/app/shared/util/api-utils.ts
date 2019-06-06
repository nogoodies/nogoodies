interface IScorePayload {
  amountEuroGiven: number;
  charityOrganization: string;
  co2Saved: number;
  confName: string;
  goodiesNotTaken: number;
}

export function fetchScore(): Promise<IScorePayload> {
  return fetchJson('api/score');
}

function fetchJson(path: string): Promise<any> {
  return fetch(path).then(result => result.json());
}
