const getPlayerColorFromId = (id, roomId, rooms) => {
    const room = rooms.find((i) => roomId === i.roomId);
    const user = room.users.find((i) => i.id === id);
    return user.color;
};
module.exports = getPlayerColorFromId;
