const zendeskClient = require('./zendeskClient')

async function listGroups (groupName) {
  const client = zendeskClient()

  groupName = groupName.toLowerCase()

  try {
    const groups = await client.groups.list()

    // Doing an "includes" match in case GPT-3 adds more words
    // to the group name.
    const matchingGroup = groups.find((group) => {
      if (groupName.includes(group.name.toLowerCase())) {
        return group.id
      }

      return false
    })

    // This could cause trouble if we have multiple
    // overlapping group names, but good enough for a demo.
    return matchingGroup.id
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = listGroups
