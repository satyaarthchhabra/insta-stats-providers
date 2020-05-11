const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
    const username = 'willsmith';
    const baseUrl = `https://www.instagram.com/${username}
`;
    let response = await request(baseUrl);

    let $ = cheerio.load(response);
    let script = $('script[type="text/javascript"]').eq(3).html();
    let scriptRegex = /window._sharedData = (.+);/g.exec(script);
    let instagramData = JSON.parse(scriptRegex[1]);


    let instaData = {
        instafollower: instagramData.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count,
        instafollowing: instagramData.entry_data.ProfilePage[0].graphql.user.edge_follow.count,
        uploads: instagramData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count,
        full_name: instagramData.entry_data.ProfilePage[0].graphql.user.full_name,
        picture_url: instagramData.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd
    }
    console.log(instaData);



    debugger;
})();