export let peerConstraints = {
  //   iceServers: [
  //     {
  //       urls: 'stun:66.51.123.88:3478',
  //     },
  //     {
  //       urls: 'turn:66.51.123.88:3478?transport=tcp',
  //       username: 'wellbeing',
  //       credential: 'wellbeingRTC',
  //     },
  //   ],

  iceServers: [
    {urls: ['stun:66.51.123.88:3478']},
    {
      urls: ['turn:66.51.123.88:3478'],
      username: 'wellbeing',
      credential: 'wellbeingRTC',
    },
  ],
};

// export let peerConnection = new RTCPeerConnection({
//   ...peerConstraints,
//   iceTransportPolicy: 'all',
// });
