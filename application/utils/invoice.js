export const _deStructureTrackingStatus = (trackingStatus) => {
    let currentStatus = trackingStatus.current_status;
    let status = trackingStatus[currentStatus].status;
    let position = currentStatus == 'received' ? 
                    0 : currentStatus == 'initialReview' ?
                    1 : currentStatus == 'underReview' ?
                    2 : currentStatus == 'underApprove' ?
                    3 : currentStatus == 'paymentInProcess' ? 
                    4 : currentStatus == 'paid' ? 
                    5 : -1;
    let title = currentStatus == 'received' ? 
                    'Invoice Creation' : currentStatus == 'initialReview' ?
                    'Initial Review' : currentStatus == 'underReview' ?
                    'Account Review' : currentStatus == 'underApprove' ?
                    'Account Approval' : currentStatus == 'paymentInProcess' ? 
                    'Payment' : currentStatus == 'paid' ? 
                    'Other' : -1;

    let CurrenStatusObj = trackingStatus[currentStatus];
    return {
        title,
        currentStatus,
        status,
        position,
        CurrenStatusObj,
    };
}