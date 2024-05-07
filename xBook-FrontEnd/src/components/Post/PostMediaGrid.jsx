import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

export default function PostMediaGrid({ media }) {

    if (media.length === 1) {
        // Якщо лише одна картинка, вона займає весь контейнер та центрується
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img src={media[0]} alt="Image 1" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
        );
    } else if (media.length === 2) {
        // Якщо дві картинки, вони розташовуються в стовпчик і ділять контейнер пополам
        return (
            <Grid container spacing={2} style={{ height: '100%' }}>
                {media.map((image, index) => (
                    <Grid item xs={12} key={index}>
                        <img src={image} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </Grid>
                ))}
            </Grid>
        );
    } else if (media.length === 3) {
        // Якщо є три зображення, перше займає верхню половину контейнера, а інші два - нижню половину в рядку
        const firstImage = (
            <Grid item xs={12} key={0} style={{ height: '50%' }}>
                <img src={media[0]} alt="Image 1" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Grid>
        );

        const remainingImages = media.slice(1);
        const remainingImagesContent = remainingImages.map((image, index) => (
            <Grid item xs={6} key={index + 1} style={{ height: '50%' }}>
                <img src={image} alt={`Image ${index + 2}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Grid>
        ));

        return (
            <Grid container spacing={2} style={{ height: '100%' }}>
                {firstImage}
                {remainingImagesContent}
            </Grid>
        );
    } else if (media.length === 4) {
        // Якщо є чотири зображення, перші два займають верхню половину контейнера, а інші два - нижню
        const firstTwoImages = media.slice(0, 2).map((image, index) => (
            <Grid item xs={6} key={index} style={{ height: '50%' }}>
                <img src={image} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Grid>
        ));

        const lastTwoImages = media.slice(2).map((image, index) => (
            <Grid item xs={6} key={index + 2} style={{ height: '50%' }}>
                <img src={image} alt={`Image ${index + 3}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Grid>
        ));

        return (
            <Grid container spacing={2} style={{ height: '100%' }}>
                {firstTwoImages}
                {lastTwoImages}
            </Grid>
        );
    } else {
        // Якщо зображень більше ніж 4, виводимо лише перші чотири
        const firstFourImages = media.slice(0, 4).map((image, index) => (
            <Grid item xs={6} key={index} style={{ height: '50%' }}>
                <img src={image} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Grid>
        ));

        return (
            <Grid container spacing={2} style={{ height: '100%' }}>
                {firstFourImages}
            </Grid>
        );
    }
}

PostMediaGrid.propTypes = {
    media: PropTypes.arrayOf(PropTypes.string).isRequired
};