interface IScorePayload {
  amountEuroGiven: number;
  charityOrganization: string;
  co2Saved: number;
  confName: string;
  goodiesNotTaken: number;
}

interface ITweet {
  tweetId: string;
}

export interface ITweetsPayload extends Array<ITweet> {}

export function fetchScore(): Promise<IScorePayload> {
  return fetchJson('api/score');
}

export function fetchTweets(): Promise<ITweetsPayload> {
  return fetchJson('api/tweets');
}

function fetchJson(path: string): Promise<any> {
  return fetch(path).then(result => result.json());
}
