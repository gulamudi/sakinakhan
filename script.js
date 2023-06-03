document.addEventListener('DOMContentLoaded', (event) => {
    const pageLinks = document.querySelectorAll('.page-link');
    const topLinks = document.querySelectorAll('.top-link');

    const aboutImage = document.querySelector('#about-image');
    aboutImage.style.display = 'none';

    const content = document.querySelector('#content');
    content.style.display = 'none';

    topLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
    
            // Remove 'selected' class from all links
            topLinks.forEach((lnk) => {
                lnk.classList.remove('selected');
            });

            pageLinks.forEach((lnk) => {
                lnk.classList.remove('selected');
            });

            // Add 'selected' class to clicked link
            link.classList.add('selected');
            
            const pageTitle = document.querySelector('#page-title');
            const content = document.querySelector('#content');
            const links = document.querySelector('#links');
            const page = link.getAttribute('href').substring(1); // Remove the # from the href
    
            const workImage = document.querySelector('#work-image');
            const aboutImage = document.querySelector('#about-image');

            if (page === 'work') {
                workImage.style.display = 'block';
                content.style.display = 'none';
                links.style.display = 'flex';
                aboutImage.style.display = 'none';
            } else {
                workImage.style.display = 'none';
                content.style.display = 'none';
                links.style.display = 'none';
                aboutImage.style.display = 'block';
            }
        });
    });

    pageLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
    
            // Remove 'selected' class from all links
            pageLinks.forEach((lnk) => {
                lnk.classList.remove('selected');
            });

            // Add 'selected' class to clicked link
            link.classList.add('selected');
            
            const pageTitle = document.querySelector('#page-title');
            const content = document.querySelector('#content');
            const videoContainer = document.querySelector('#video-container');
            const songList = document.querySelector('#song-list');
            const page = link.getAttribute('href').substring(1); // Remove the # from the href
            const links = document.querySelector('#links');
    
            const workImage = document.querySelector('#work-image');
            const aboutImage = document.querySelector('#about-image');

            workImage.style.display = 'none';
            aboutImage.style.display = 'none';
            content.style.display = 'flex';
            
            if (page === 'press') {
                workImage.style.display = 'none';
                content.style.display = 'none';
                links.style.display = 'flex';
                aboutImage.style.display = 'none';
            } 

            pageTitle.innerText = page.replace('-', ' ').toUpperCase();
    
            videoContainer.innerHTML = `<div style="font-size: 10px;">Some videos are restricted to play as embedded video by the channel. Please click 'Watch on YouTube'.</div><iframe id="video-iframe" width="560" height="315" src="${videoMap[page].default}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    
            songList.innerHTML = '';

            let currentPlayingSong = null;

            Object.keys(videoMap[page].songs).forEach((song, index) => {
                const listItem = document.createElement('div');
                const box = document.createElement('div');
                box.className = 'box';
                listItem.appendChild(box);
                box.innerHTML = titleMap[song];
                listItem.className = 'song';
                listItem.dataset.videoUrl = videoMap[page].songs[song]; // Store the video URL in a data attribute
                songList.appendChild(listItem);

                // Assuming your iframe has the id 'video-iframe'
                let videoIframe = document.getElementById('video-iframe');
                // Add click event listener for each song
                listItem.addEventListener('click', function() {
                    // Get the video URL from the clicked song
                    let videoUrl = this.dataset.videoUrl;

                    // Set the 'src' attribute of the video container to the video URL
                    videoIframe.setAttribute('src', videoUrl);

                    // If a song was playing before, remove the 'song-playing' class from it
                    if (currentPlayingSong) {
                        currentPlayingSong.classList.remove('song-playing');
                    }

                    // Add the 'song-playing' class to the clicked song
                    listItem.classList.add('song-playing');

                    // Update the current playing song
                    currentPlayingSong = listItem;
                });

                // If it's the first song in the list, set it as the current playing song
                if (index === 0) {
                    listItem.classList.add('song-playing');
                    currentPlayingSong = listItem;
                }
            });
        });
    });
});

// Function to set height
function setHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial height
setHeight();

// Update height on resize
window.addEventListener('resize', () => {
    setHeight();
});



const videoMap = {
    'movie-songs': {
        'default': 'https://www.youtube.com/embed/kRpGVM4y80c',
        'songs': {
            'Phobia': 'https://www.youtube.com/embed/kRpGVM4y80c',
            'Hairani': 'https://www.youtube.com/embed/i4c4uP04iBk',
            'Phir Tu': 'https://www.youtube.com/embed/AT9NVG4B3Go',
            'Phir Tu Live': 'https://www.youtube.com/embed/g10uz7InWJI'
        }
    },
    'advertisements': {
        'default': 'https://www.youtube.com/embed/J4KVyBO0gmc',
        'songs': {
            'Kerovit': 'https://www.youtube.com/embed/J4KVyBO0gmc',
            'Tata Dark': 'https://www.youtube.com/embed/6i0Z3Md_Xeg',
            'Suzuki': 'https://www.youtube.com/embed/BIEJNNZKgJ0',
            'Capture': 'https://www.youtube.com/embed/8Iisknqp2gg',
        }
    },
    'television': {
        'default': 'https://www.youtube.com/embed/807f4e5f5Q4',
        'songs': {
            'Signature': 'https://www.youtube.com/embed/807f4e5f5Q4',
            'Signature Promo': 'https://www.youtube.com/embed/e47-Z5tmLxw',
        }
    },
    'originals': {
        'default': 'https://www.youtube.com/embed/86nlPZbkmZg',
        'songs': {
            'Rubaru': 'https://www.youtube.com/embed/86nlPZbkmZg',
            'My Soul': 'https://www.youtube.com/embed/Rp6An687HNI',
            'Light': 'https://www.youtube.com/embed/rKk-LfrbAgg',
            'Jaagi': 'https://www.youtube.com/embed/vCFnl8oncqg',
            'Sweet pea': 'https://www.youtube.com/embed/uCXbtke6lso',
            'Garden Grows': 'https://www.youtube.com/embed/WXPfiG6WA1U',
            'Santa baby': 'https://www.youtube.com/embed/3QEZp9-6UMQ',
            'Valentine': 'https://www.youtube.com/embed/Muti3tNxB1U',
            'Landslide': 'https://www.youtube.com/embed/9Yx8J9nfL-8',
            'Wonderwall': 'https://www.youtube.com/embed/-6NOekVsL54',
        }
    },
};

const titleMap = {
    'Phobia': '<div>Song: Roke Na Ruke</div><div>Movie: Phobia</div><div>Music Director: Daniel B. George</div><div>Label: Eros International</div>',
    'Hairani': '<div>Song: Hairani</div><div>Movie: Love Shagun</div><div>Music Director: Rishi - Siddharth</div><div>Label: Zee Music Company</div>',
    'Phir Tu': '<div>Song: Phir Tu</div><div>Movie: The Legend Of Michael Mishra</div><div>Music Director: Abhinav Bansal</div><div>Label: T-Series</div>',
    'Phir Tu Live': '<div>Song: Phir Tu Live</div><div>Movie: The Legend Of Michael Mishra</div><div>Music Director: Abhinav Bansal</div><div>Label: Eros International</div>',
    'Kerovit': '<div>Brand: Kerovit</div><div>Music Director: Naozad Patel</div><div>Agency: The Crayons Network</div>',
    'Tata Dark': '<div>Brand: Tata Dark</div><div>Music Director: Naozad Patel</div><div>Agency: The Wired Society</div>',
    'Suzuki': '<div>Brand: Suzuki Burgman</div><div>Music Director: Naozad Patel</div><div>Agency: Asylum Films</div>',
    'Capture': '<div>Brand: Renault Capture</div><div>Music Director: Naozad Patel</div><div>Agency: Hundred Frames</div>',
    'Signature': '<div>Program: Signature Experiences</div><br><div>Sakina Khan is Indian Ocean\'s first choice as their mentee - under the #SignatureExpressions Mentorship Programme.</div>',
    'Signature Promo': '<div>Program: Signature Experiences Promo</div><br><div>Sakina Khan is Indian Ocean\'s first choice as their mentee - under the #SignatureExpressions Mentorship Programme.</div>',
    'Rubaru': '<div>Song: Tu Rubaru</div><div>Collaboration: Ujjwal Kashyap</div>',
    'My Soul': '<div>Song: My Soul</div><div>Collaboration: Abhinav Bansal</div>',
    'Light': '<div>Song: I See The Light</div><div>Collaboration: Daniel B. George</div>',
    'Jaagi': '<div>Song: Jaagi saari raat</div><div>Collaboration: Rajkumar Dewan</div>',
    'Sweet pea': '<div>Song: Sweet pea</div><div>Collaboration: Jared Tasho</div><div>Cover: Amos lee</div>',
    'Garden Grows': '<div>Song: Garden Grows</div><div>Original Composition</div>',
    'Santa baby': '<div>Song: Santa baby (cover)</div><div>Collaboration: Karan Malhotra</div>',
    'Valentine': '<div>Song: My Funny Valentine</div><div>Cover: Chet Baker</div>',
    'Landslide': '<div>Song: Landslide</div><div>Cover: Fleetwood Mac</div>',
    'Wonderwall': '<div>Song: Wonderwall</div><div>Cover: Oasis</div>',
};

