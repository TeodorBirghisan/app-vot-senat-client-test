const HOST = 'http://192.168.1.2:8080';

const apiLoginAdmin = `${HOST}/user/login-admin`;
const apiLoginSuperAdmin = `${HOST}/user/login-super-admin`;
const apiLoginSenator = `${HOST}/user/login-senator`;
const apiLoginGuest = `${HOST}/user/login-guest`;
const apiCreateMeeting = `${HOST}/meeting/createMeeting`;
const apiGetAllMeetings = `${HOST}/meeting/all`;
const apiGetAllVotValues = `${HOST}/votValue/all`;
const apiAllTopicsInMeetingID = (id) =>
  `${HOST}/topic/allTopicsInMeeting/${id}`;
const apiCreateTopicForMeeting = (id) =>
  `${HOST}/topic/createTopicForMeeting/${id}`;
const apiAllMembersFromMeetingID = (id) =>
  `${HOST}/meeting/allMembersFromMeeting/${id}`;
const apiJoinMeetingAsUser = (meetingId, userId) =>
  `${HOST}/user/joinMeeting/${meetingId}/asUser/${userId}`;
const apiVoteAsUserAtMeetingForTopic = (userId, meetingId, topicId) =>
  `${HOST}/vote/asUser/${userId}/atMeeting/${meetingId}/forTopic/${topicId}/`;
const apiResultForTopic = (topicId) =>
  `${HOST}/topic/resultForTopic/${topicId}`;
const apiDeleteAMeeting = (meetingId) => `${HOST}/meeting/delete/${meetingId}`;
const apiRegisterSenator = `${HOST}/user/register-senator`;
const apiRegisterAdmin = `${HOST}/user/register-admin`;
const apiRegisterSuperAdmin = `${HOST}/user/register-super-admin`;
const apiRegisterGuest = `${HOST}/user/register-guest`;
const apiGetVoteOfUserInMeeting = (userId, meetingId, topicId) =>
  `${HOST}/vote/getVoteResultFromUser/${userId}/meeting/${meetingId}/topic/${topicId}`;

async function postLoginSuperAdmin(params) {
  try {
    let response = await fetch(apiLoginSuperAdmin, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(params)
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function postLoginAdmin(params) {
  try {
    let response = await fetch(apiLoginAdmin, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(params)
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function postLoginSenator(params) {
  try {
    let response = await fetch(apiLoginSenator, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(params)
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function postLoginGuest(params) {
  try {
    let response = await fetch(apiLoginGuest, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(params)
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}
async function postCreateMeeting(params, token) {
  try {
    console.log(token);
    let response = await fetch(apiCreateMeeting, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token
      },
      body: JSON.stringify(params)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function getAllMeetings() {
  try {
    let response = await fetch(apiGetAllMeetings);
    let json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllVoteValues() {
  try {
    let response = await fetch(apiGetAllVotValues);
    let json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllTopicsInMeeting(id) {
  try {
    let response = await fetch(apiAllTopicsInMeetingID(id));
    let json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

async function createTopicForMeeting(id, topic, token) {
  try {
    let response = await fetch(apiCreateTopicForMeeting(id), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token
      },
      body: JSON.stringify(topic)
    });
    let json = response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function getAllMembersFromMeeting(id) {
  try {
    ///De aici pot scoate si meeting participation
    ///Sa vad cati useri au participat la cate meetinguri
    let response = await fetch(apiAllMembersFromMeetingID(id));
    let json = await response.json();
    return json.data.values;
  } catch (error) {
    console.log(error);
  }
}

async function joinMeetingAsUSer(meetingId, userId, token) {
  try {
    let response = await fetch(apiJoinMeetingAsUser(meetingId, userId), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token
      }
      ///body: JSON.stringify(topic)
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function voteAsUserAtMeetingForTopic(
  userId,
  meetingId,
  topicId,
  value,
  token
) {
  try {
    let response = await fetch(
      apiVoteAsUserAtMeetingForTopic(userId, meetingId, topicId),
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: token
        },
        body: JSON.stringify(value)
      }
    );
    let json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

async function calculateResultForTopic(topicId) {
  try {
    let response = await fetch(apiResultForTopic(topicId), {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    let json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteAMeeting(meetingId, token) {
  try {
    let response = await fetch(apiDeleteAMeeting(meetingId), {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token
      }
    });
    let json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

async function registerSenator(params) {
  try {
    let response = await fetch(apiRegisterSenator, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(params)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function registerAdmin(params) {
  try {
    let response = await fetch(apiRegisterAdmin, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(params)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function registerSuperAdmin(params) {
  try {
    let response = await fetch(apiRegisterSuperAdmin, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(params)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

async function getVoteOfUserInMeeting(userId, meetingId, topicId) {
  try {
    let response = await fetch(
      apiGetVoteOfUserInMeeting(userId, meetingId, topicId)
    );
    let responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.log(error);
  }
}

export {
  postLoginSuperAdmin,
  postLoginAdmin,
  postLoginSenator,
  postLoginGuest,
  postCreateMeeting,
  getAllMeetings,
  getAllVoteValues,
  getAllTopicsInMeeting,
  createTopicForMeeting,
  getAllMembersFromMeeting,
  joinMeetingAsUSer,
  voteAsUserAtMeetingForTopic,
  calculateResultForTopic,
  deleteAMeeting,
  registerAdmin,
  registerSenator,
  registerSuperAdmin,
  getVoteOfUserInMeeting
};
