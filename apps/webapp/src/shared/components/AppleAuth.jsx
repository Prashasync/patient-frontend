// import React from 'react';

// const AppleAuth = ({ onSuccess, onError }) => {
//     return (
//         <div>
//             <AppleSignin
//                 authOptions={{
//                     clientId: 'com.example.app',
//                     scope: 'email name',
//                     redirectURI: 'https://ftmwsamij8.execute-api.us-east-1.amazonaws.com/SNS/auth/callback',
//                     state: 'state',
//                     nonce: 'nonce',
//                     usePopup: true,
//                 }}
//                 onSuccess={(response) => onSuccess(response)}
//                 onError={(error) => onError(error)}
//                 render={(props) => (
//                     <button {...props} style={{ background: 'black', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
//                         Sign in with Apple
//                     </button>
//                 )}
//             />
//         </div>
//     );
// };

// export default AppleAuth;