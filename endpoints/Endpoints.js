const HOST = 'http://192.168.1.4:8080';

const apiLoginUser = `${HOST}/user/login-admin`;
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

async function postLogin(params) {
  try {
    let response = await fetch(apiLoginUser, {
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

async function postCreateMeeting(params) {
  try {
    let response = await fetch(apiCreateMeeting, {
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

async function createTopicForMeeting(id, topic) {
  try {
    let response = await fetch(apiCreateTopicForMeeting(id), {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
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

async function joinMeetingAsUSer(meetingId, userId) {
  try {
    let response = await fetch(apiJoinMeetingAsUser(meetingId, userId), {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
      ///body: JSON.stringify(topic)
    });
    let json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}

export {
  postLogin,
  postCreateMeeting,
  getAllMeetings,
  getAllVoteValues,
  getAllTopicsInMeeting,
  createTopicForMeeting,
  getAllMembersFromMeeting,
  joinMeetingAsUSer
};
