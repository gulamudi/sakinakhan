document.addEventListener('DOMContentLoaded', (event) => {
    const pageLinks = document.querySelectorAll('.page-link');
    const topLinks = document.querySelectorAll('.top-link');

    const links = document.querySelector('#links');

    const work = document.querySelector('#work-image');
    const about = document.querySelector('#about-image');
    
    const content = document.querySelector('#content');
    const pageTitle = document.querySelector('#page-title');
    const videoContainer = document.querySelector('#video-container');
    const songList = document.querySelector('#song-list');

    const press = document.querySelector('#press');
    const imageSources = ['press1.jpeg', 'press2.jpeg', 'press3.jpeg', 'press4.jpeg'];

    const name = document.querySelector('#name');

    about.style.display = 'none';
    content.style.display = 'none';
    press.style.display = 'none';

    name.addEventListener('click', (event) => {
        event.preventDefault();
        press.style.display = 'none';
        content.style.display = 'none';
        work.style.display = 'block';
        links.style.display = 'flex';
        about.style.display = 'none';  
    });

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
            
            const page = link.getAttribute('href').substring(1); // Remove the # from the href
    
            press.style.display = 'none';
            content.style.display = 'none';

            if (page === 'work') {
                work.style.display = 'block';
                links.style.display = 'flex';
                about.style.display = 'none';                
            } else {
                work.style.display = 'none';
                links.style.display = 'none';
                about.style.display = 'block';
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
            
            const page = link.getAttribute('href').substring(1); // Remove the # from the href
            
            press.style.display = 'none';
            work.style.display = 'none';
            about.style.display = 'none';
            content.style.display = 'flex';
            
            if (page === 'press') {
                press.innerHTML = '';
                work.style.display = 'none';
                content.style.display = 'none';
                links.style.display = 'flex';
                about.style.display = 'none';
                press.style.display = 'flex';
                press.style.flexDirection = 'column';
                press.style.alignItems = 'center';

                // Create and add the title
                const title = document.createElement('h2');
                title.textContent = 'PRESS';
                // title.style.margin = 0;

                press.appendChild(title);

                imageSources.forEach((source, index) => {
                    const newDiv = document.createElement('div');
                    const newImg = document.createElement('img');
                  
                    newImg.src = source;
                    newImg.alt = `Description of Image ${index + 1}`;
                    newImg.style.maxWidth = '100%';

                    newDiv.appendChild(newImg);
                    press.appendChild(newDiv);
                  });
            } 

            pageTitle.innerText = page.replace('-', ' ').toUpperCase();

            let iframeWidth = window.innerWidth < 560 ? window.innerWidth - 70 : 560;
            let iframeHeight = window.innerWidth < 560 ? 245 : 315;

            videoContainer.innerHTML = `<iframe id="video-iframe"  width="${iframeWidth}" height="${iframeHeight}" src="${videoMap[page].default}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            // videoContainer.innerHTML = `<div style="font-size: 10px;">Some videos are restricted to play as embedded video by the channel. Please click 'Watch on YouTube'.</div><div class="video-container-box"><iframe id="video-iframe"  src="${videoMap[page].default}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
    //width="560" height="315"  
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

const videoMap = {
    'movie-songs': {
        'default': 'https://www.youtube.com/embed/kRpGVM4y80c',
        'songs': {
            'Phobia': 'https://www.youtube.com/embed/kRpGVM4y80c',
            'Hairani': 'https://www.youtube.com/embed/i4c4uP04iBk',
            'Phir Tu': 'https://www.youtube.com/embed/AT9NVG4B3Go',
            'Talaash': 'https://www.youtube.com/embed/gbwnbCBwuso',
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
            'Luvit1': 'https://www.youtube.com/embed/AYQO-JeQMOg',
            'Luvit2': 'https://www.youtube.com/embed/NCyh-14lKqw',
            'Luvit3': 'https://www.youtube.com/embed/pNFWApKEQV4',
            'Luvit4': 'https://www.youtube.com/embed/OB5cbwHU-ks',
            'Manforce': 'https://www.youtube.com/embed/ERjSo8tpa4M',
            'Volvo': 'https://www.youtube.com/embed/0lBbZWJ19Jo',
            'Myntra': 'https://www.youtube.com/embed/o-blEkO8kms',
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
            'Papasheks': 'https://www.youtube.com/embed/zQzURSsFv84',
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
    'Phobia': '<div>Song: Roke Na Ruke (<a href="https://open.spotify.com/track/651J4ahufxim6iRsJ6O8hr?si=7e6270e8783d4ad3" target="_blank">Spotify</a>)</div><div>Movie: Phobia</div><div>Music Director: Daniel B. George</div><div>Label: Eros International</div>',
    'Hairani': '<div>Song: Hairani</div><div>Movie: Love Shagun</div><div>Music Director: Rishi - Siddharth</div><div>Label: Zee Music Company</div>',
    'Phir Tu': '<div>Song: Phir Tu (<a href="https://open.spotify.com/track/4oyGI9Q5mHdZZITv40mxzX?si=49cc3d10f588421c" target="_blank">Spotify</a>)</div><div>Movie: The Legend Of Michael Mishra</div><div>Music Director: Abhinav Bansal</div><div>Label: T-Series</div>',
    'Phir Tu Live': '<div>Song: Phir Tu Live</div><div>Movie: The Legend Of Michael Mishra</div><div>Music Director: Abhinav Bansal</div><div>Label: T-Series</div>',
    'Talaash': '<div>Song: Ek Talaash Hai (<a href="https://open.spotify.com/track/1cjGD7PBDgRqTc7RzQbJd4?si=93ba9e020b644127" target="_blank">Spotify</a>)</div><div>Movie: Mona Darling</div><div>Music Director: Manish J. Tipu</div><div>Label: T-Series</div>',
    'Kerovit': '<div>Brand: Kerovit</div><div>Music Director: Naozad Patel</div><div>Agency: The Crayons Network</div>',
    'Tata Dark': '<div>Brand: Tata Dark</div><div>Music Director: Naozad Patel</div><div>Agency: The Wired Society</div>',
    'Suzuki': '<div>Brand: Suzuki Burgman</div><div>Music Director: Naozad Patel</div><div>Agency: Asylum Films</div>',
    'Capture': '<div>Brand: Renault Capture</div><div>Music Director: Naozad Patel</div><div>Agency: Hundred Frames</div>',
    'Luvit1': '<div>Brand: Luvit Chocolate</div>',
    'Luvit2': '<div>Brand: Luvit Chocolate</div>',
    'Luvit3': '<div>Brand: Luvit Chocolate</div>',
    'Luvit4': '<div>Brand: Luvit Chocolate</div>',
    'Manforce': '<div>Brand: Manforce Cocktail</div><div>Produced By: Charcoal Films</div>',
    'Volvo': '<div>Brand: Volvo Auto India</div>',
    'Myntra': '<div>Brand: Myntra</div><div>Voiceover</div>',
    'Signature': '<div>Program: Signature Experiences</div><br><div>Sakina Khan is Indian Ocean\'s first choice as their mentee - under the #SignatureExpressions Mentorship Programme.</div>',
    'Signature Promo': '<div>Program: Signature Experiences Promo</div><br><div>Sakina Khan is Indian Ocean\'s first choice as their mentee - under the #SignatureExpressions Mentorship Programme.</div>',
    'Rubaru': '<div>Song: Tu Rubaru (<a href="https://open.spotify.com/track/4hExgsCzJN6jCCTuo5EDiR?si=f24167fa9907430b" target="_blank">Spotify</a>)</div><div>Collaboration: Ujjwal Kashyap</div>',
    'My Soul': '<div>Song: My Soul (<a href="https://open.spotify.com/track/0ifoAAhjsw58ZPBj2RsDRJ?si=55451c53fb3c4895" target="_blank">Spotify</a>)</div><div>Collaboration: Abhinav Bansal</div>',
    'Light': '<div>Song: I See The Light</div><div>Collaboration: Daniel B. George</div>',
    'Papasheks': '<div>Song: On My Mind (<a href=https://open.spotify.com/track/3TW9XS7RIgs30MSNJ6NzJw?si=ea24b6c5ce1040ff" target="_blank">Spotify</a>)</div><div>Collaboration: Papasheks</div>',
    'Jaagi': '<div>Song: Jaagi saari raat</div><div>Collaboration: Rajkumar Dewan</div>',
    'Sweet pea': '<div>Song: Sweet pea</div><div>Collaboration: Jared Tasho</div><div>Cover: Amos lee</div>',
    'Garden Grows': '<div>Song: Garden Grows</div><div>Original Composition</div>',
    'Santa baby': '<div>Song: Santa baby (cover)</div><div>Collaboration: Karan Malhotra</div>',
    'Valentine': '<div>Song: My Funny Valentine</div><div>Cover: Chet Baker</div>',
    'Landslide': '<div>Song: Landslide</div><div>Cover: Fleetwood Mac</div>',
    'Wonderwall': '<div>Song: Wonderwall</div><div>Cover: Oasis</div>',
};



