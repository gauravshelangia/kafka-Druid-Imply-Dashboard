# Affable Data Engineering Task

**Mockstagram** is a new and upcoming social media platform. To promote its platform, Mockstagram has decided to open up its APIs. Here is their API specification:

```jsx
GET /api/v1/influencers/:pk
RESPONSE:
{
	"pk": 1000001,
	"username": "influencer-100001",
	"followerCount": 57166,
	"followingCount": 1328
	}
```

Where `:pk` is a number between 1,000,000 and 1,999,999 (inclusive)

**Note:** Every time you call the endpoint with the same :pk, the `followerCount` and `followingCount` of that influencer changes.

## The Setup:

You join a company that is building a data platform for influencer marketing. They want to leverage the API above to create a dashboard that tracks Mockstagram influencer statistics. As an example, for a given user, the dashboard would show a time-series graph of the influencer's `followerCount` and other statistics.

## Your Task

Your task is to create a data pipeline that extracts this data from the API and populates a database that allows your company to view the following properties of an influencer **over time**:

1. `followerCount`
2. `followingCount`
3. The ratio of `followerCount` to `followingCount` (We will refer to this ratio as `followerRatio` from hereon).

This data will power time-series graphs on the dashboard like so:

![Affable%20Data%20Engineering%20Task%200224f6259847442e9163c2431c3472b5/followers.png](Affable%20Data%20Engineering%20Task%200224f6259847442e9163c2431c3472b5/followers.png)

Although the resolution of the time series in the graph is a single day, your solution should seek to push updates as frequently as possible. Ideally, your company wants to show minute by minute updates to the follower counts. 

**In addition to these time-series data, they also want to see:**

1. The **most recent data** of an influencer on the page
2. The `followerCount` rank of an influencer
3. The `averagefollowerCount` across all influencers

I.e. the Influencer that has the most number of followers should have rank 1, the influencer that has the second most number of followers as rank 2 and so on. Rank of influencers with the same `followerCount` should be equal.

## Bonus Task:

Users are getting frustrated with influencers that buy followers to artificially inflate their ranking. Your colleagues at the company have deployed an API that, given an influencer's details, can classify an influencer as `suspicious` or `not_suspicious`. However, this is an expensive computation and it can take up-to 10 seconds to perform. 

The endpoint for this is as follows: 

```jsx
POST /api/v1/influencers/is_suspicious
BODY: 
{
	"pk": 1000001,
	"username": "influencer-100001",
	"followerCount": 57166,
	"followingCount": 1328
}

RESPONSE:
{
  "pk": 1000001,
  "suspicious": false,
}
```

Your bonus task is to update the pipeline such that the database now includes for every influencer whether they are suspicious or not. 

**Note:** Ensure that your solution has minimal impact to the throughput of the pipeline. Influencer's suspicious state only needs to be updated once a day.

## Requirements Checklist

As for your deliverables, we require:

- [ ]  Architecture Diagram
- [ ]  A document explaining your design decisions
- [ ]  All supporting schema / queries / code
- [ ]  Link to a git repository with instructions on how to set it up.

## Notes

- You are not allowed to modify any code in mockstagram api. Treat it as an external service.
- Make the time-series as granular as possible. We would ideally like to see one minute resolution. Since there are a million influencers, that means your solution should be able to scale to ~16.7k ops / second. For example, if you can achieve 4k ops / second on your machine, you need to prove that 4 machines would scale to 16k ops / second.
- Prefer streaming solutions over batch solutions.
- Assume that there are atleast 10,000 active users that view influencers data every hour. In other words, ensure your reads don't scan the entire database each time.
- Choose your database wisely.
- Bonus points for tests

 

---

## Starting Mockstagram

Download mockstagram from here:

[mockstagram-api-master.zip](Affable%20Data%20Engineering%20Task%200224f6259847442e9163c2431c3472b5/mockstagram-api-master.zip)

It is a simple Node+Express app. Instructions on how to start the server are available in README.md