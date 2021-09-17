import {
    createMember,
    getAllMembers,
    dscLead,
    dscHeads,
    dscWebTeam,
    dscAndroidTeam,
    dscFlutterTeam,
    dscMultimediaTeam,
    dscManagement,
    deleteMember,
    updateMember
} from '../Controllers/members';

module.exports = (app) => {
    app.post('/team/newMember', createMember);
    app.get('/team/allMembers', getAllMembers);
    app.get('/team/dscLead', dscLead);
    app.get('/team/dscHeads', dscHeads);
    app.get('/team/dscWebTeam', dscWebTeam);
    app.get('/team/dscAndroidTeam', dscAndroidTeam);
    app.get('/team/dscFlutterTeam', dscFlutterTeam);
    app.get('/team/dscMultimediaTeam', dscMultimediaTeam);
    app.get('/team/dscManagement', dscManagement);
    app.delete('/team/deleteMember', deleteMember),
    app.put('/team/updateMember', updateMember)
}