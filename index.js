const request =require('request-promise');
const cheerio =require('cheerio');

(async () => {
const username ='willsmith';
const baseUrl =`https://www.instagram.com/${username}
`;
let response = await request(baseUrl);

let $=cheerio.load(response);
let script= $('script[type="text/javascript"]').eq(3).html();
let scriptRegex=/window._sharedData = (.+);/g.exec(script);
let instagramData=JSON.parse(scriptRegex[1]);
let instaFollower=instagramData.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count;
console.log("insta followers are "+ instaFollower);
let instaFollowing=instagramData.entry_data.ProfilePage[0].graphql.user.edge_follow.count;
console.log('insta following ' + instaFollowing);

debugger;
})();