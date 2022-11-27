const getRandomImage = () => {
    const images = [
        'https://static.wikia.nocookie.net/barnyard/images/6/6c/Otis_the_Cow.jpg/revision/latest/top-crop/width/360/height/360?cb=20180810181038',
        'https://www.streamscheme.com/wp-content/uploads/2020/04/poggers.png.webp',
        'https://st.depositphotos.com/1061780/1223/v/600/depositphotos_12234714-stock-illustration-daft-chicken-cartoon-02.jpg',
        'https://i.pinimg.com/736x/1e/8a/a7/1e8aa71955fcbd792bf1d7b7d0daa4f4.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cow_cartoon_04.svg/800px-Cow_cartoon_04.svg.png',
        'https://vroegert.nl/wp-content/uploads/2021/08/Boes-Boes-uitdrukkingen-VPRO--scaled-e1630338511156-1024x753.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/33/Chopin%2C_by_Wodzinska.JPG',
    ];
    const image = images[Math.floor(Math.random() * images.length)];
    return image;
};
module.exports = getRandomImage;
