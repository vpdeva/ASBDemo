const appName = 'KauriID';
const uportconnect = window.uportconnect;
// const Connect = window.uportconnect.Connect;
// const SimpleSigner = window.uportconnect.SimpleSigner;

// Uncomment after sometime since the App Profile is not deployed yet
const uport = new uportconnect.Connect('kauri-login', {
    clientId: '2oy1eyQuGutToy3R1mjuWydE2NQXXXsxxYZ',
    network: 'rinkeby',
    signer: uportconnect.SimpleSigner('591d9071d49c91f0b15694a7f0fd9c82698f974b0010b2d55463fe81206ca77d')
});

function uportLogin(){
    // Add the Request params after the Profile is verified
    uport.requestCredentials({
        requested: ['avatar', 'name', 'email', 'phone', 'country', 'address'],
        notifications: true
    })
        .then((credentials) => {
            localStorage.setItem("name", credentials.name);
            localStorage.setItem("avatar", credentials.avatar.uri);
            localStorage.setItem("phone", credentials.phone);
            localStorage.setItem("email", credentials.email);
            localStorage.setItem("address", credentials.address);
            localStorage.setItem("country", credentials.country);
            console.log(location.protocol + "://" + location.host + '/home');
            window.location = '/dashboard';
        });

    // Attest specific credentials
    uport.attestCredentials({
        sub: uport.address,
        claim: {
            name: credentials.name
        },
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    })
        .catch(console.log)
}


