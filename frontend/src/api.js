const BASE_URL = import.meta.env.VITE_API_URL;

async function createChat(name, email) {
  const res = await fetch(BASE_URL + '/surveys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({'name': name, 'email': email})
  });
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject({ status: res.status, data });
  }
  return data.chatId;
}

async function sendChatMessage(chatId, message) {
  const res = await fetch(BASE_URL + `/surveys/${chatId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  return res.body;
}

async function finishSurvey(chatId) {
  const res = await fetch(BASE_URL + `/surveys/finish/${chatId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.json() });
  }

  console.log(res.body);

  return res.body;
}

export default {
  createChat, sendChatMessage, finishSurvey
};