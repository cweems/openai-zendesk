const zendesk = require('node-zendesk')

async function listGroups(groupName) {
    const client = zendesk.createClient({
        username: process.env.ZENDESK_EMAIL,
        token: process.env.ZENDESK_API_KEY,
        remoteUri: 'https://d3v-swiftly.zendesk.com/api/v2'
    })

    groupName = groupName.toLowerCase();

    try {
        const groups = await client.groups.list();

        // Doing an "includes" match in case GPT-3 adds more words
        // to the group name.
        let matchingGroup = groups.find((group) => {
            if (groupName.includes(group.name.toLowerCase())) {
                return group.id;
            }
        })

        // This could cause trouble if we have multiple
        // overlapping group names, but good enough for a demo.
        console.log(matchingGroup.id);
        return matchingGroup.id;

    } catch(err) {
        throw new Error(err);
    }
}

module.exports = listGroups;