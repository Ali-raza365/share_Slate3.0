const customLinking = {
    prefixes: ["invoiceMate://"],
    config:{
        screens: {
            Root:{
                screens:{
                    homenavigator:{
                        screens:{
                            homescreen:{
                                screens:{
                                    notificationstack:{
                                        screens:{
                                            notifications: 'notifications',
                                        }
                                    }
                                }
                            }
                        }
                    },
                    splash: 'splash'
                }
            }
        }
    }
};

export default customLinking;