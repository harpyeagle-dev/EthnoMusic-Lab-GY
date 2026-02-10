// Ethnomusicology Database

console.log('Script version: v23 - MASQUERADE UPDATE');
const instrumentsDatabase = [
    // Guyanese Instruments
    {
        id: 1,
        name: "Dhol",
        region: "Guyana - Indo-Guyanese",
        category: "Percussion",
        description: "A double-headed barrel drum widely used in Indo-Guyanese music, particularly during cultural celebrations like Phagwah (Holi) and weddings.",
        cultural: "The dhol is central to Indo-Guyanese cultural celebrations, representing the vibrant Hindu traditions brought by indentured laborers from India. It's played during festivals, weddings, and religious ceremonies, symbolizing joy and community unity.",
        technique: "Played with two sticks - a heavier beater (dagga) for the bass side and a lighter stick (tihli) for the treble side. Players create complex rhythmic patterns through coordinated strikes.",
        materials: "Traditionally made from mango or sheesham wood, with goat skin heads secured by rope or metal rings. Modern versions may use synthetic heads.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%238B4513' width='400' height='300'/%3E%3Cellipse cx='200' cy='150' rx='120' ry='80' fill='%23D2691E'/%3E%3Ctext x='200' y='160' font-size='24' fill='white' text-anchor='middle'%3EDhol%3C/text%3E%3C/svg%3E"
    },
    {
        id: 2,
        name: "Steel Pan",
        region: "Caribbean - Trinidad & Tobago",
        category: "Melodic Percussion",
        description: "A chromatic percussion instrument made from oil drums, invented in Trinidad and Tobago. Popular across Guyana and the Caribbean.",
        cultural: "The steel pan is a symbol of Caribbean ingenuity and resilience, born from the African musical traditions adapted to colonial restrictions. It represents the triumph of creativity over oppression and is now the national instrument of Trinidad and Tobago.",
        technique: "Played with rubber-tipped mallets, musicians strike tuned sections of the pan to produce melodic notes. Different pans cover different ranges (soprano, alto, tenor, bass).",
        materials: "Made from 55-gallon industrial oil drums. The metal is carefully hammered and shaped to create different pitch areas. Each note section is precisely tuned through sinking and tempering.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23333' width='400' height='300'/%3E%3Ccircle cx='200' cy='150' r='100' fill='%23C0C0C0' stroke='%23808080' stroke-width='3'/%3E%3Ctext x='200' y='160' font-size='20' fill='%23333' text-anchor='middle'%3ESteel Pan%3C/text%3E%3C/svg%3E"
    },
    {
        id: 3,
        name: "Tassa Drums",
        region: "Guyana - Indo-Guyanese",
        category: "Percussion",
        description: "Small kettle drums played in sets, originating from North India. Used in Guyanese cultural processions and celebrations.",
        cultural: "Tassa music is performed during Muslim celebrations like Hosay (Muharram) and Hindu festivals. The energetic rhythms accompany street processions and serve as a powerful expression of Indo-Guyanese identity.",
        technique: "Played with curved wooden sticks in rapid, intricate patterns. Usually performed in ensembles with multiple tassa players, bass drums (dhol), and brass instruments.",
        materials: "Copper or brass kettles with goat or calf skin heads. The drums are tuned by adjusting the tension of the skin using rope or metal fittings.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23654321' width='400' height='300'/%3E%3Cellipse cx='200' cy='180' rx='90' ry='50' fill='%23CD7F32'/%3E%3Cellipse cx='200' cy='120' rx='70' ry='40' fill='%23F5DEB3'/%3E%3Ctext x='200' y='250' font-size='22' fill='white' text-anchor='middle'%3ETassa%3C/text%3E%3C/svg%3E"
    },
    {
        id: 4,
        name: "Djembe",
        region: "Africa - West Africa",
        category: "Percussion",
        description: "A rope-tuned skin-covered goblet drum, integral to West African musical traditions and widely adopted in Afro-Guyanese culture.",
        cultural: "The djembe carries the heartbeat of West African communities. In Guyana, it connects Afro-Guyanese people to their ancestral roots and is used in cultural performances, storytelling, and community gatherings.",
        technique: "Played with bare hands, producing three main sounds: bass (center), tone (edge), and slap (rim). Master players combine these to create complex polyrhythmic patterns.",
        materials: "Carved from a single piece of hardwood (traditionally lenke or dimba wood) with a goatskin head. Rope or skin strips provide tuning tension.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%232F4F2F' width='400' height='300'/%3E%3Cpath d='M 200 80 Q 160 150 180 250 L 220 250 Q 240 150 200 80' fill='%238B4513'/%3E%3Cellipse cx='200' cy='80' rx='60' ry='20' fill='%23F5DEB3'/%3E%3Ctext x='200' y='280' font-size='22' fill='white' text-anchor='middle'%3EDjembe%3C/text%3E%3C/svg%3E"
    },
    {
        id: 5,
        name: "Harmonium",
        region: "India/Guyana",
        category: "Keyboard",
        description: "A hand-pumped keyboard instrument essential to Indo-Guyanese devotional music and classical performances.",
        cultural: "The harmonium is central to Hindu devotional singing (bhajans and kirtans) in Guyana. It accompanies religious ceremonies, cultural programs, and classical music performances, serving as a bridge between spiritual and artistic expression.",
        technique: "Played by pumping the bellows with one hand while playing the keyboard with the other. The continuous drone and melodic capabilities make it ideal for accompanying vocals.",
        materials: "Wooden body with internal reeds and bellows. Keys are usually made of wood or plastic. The reeds are metal and produce sound when air passes over them.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%234A0E0E' width='400' height='300'/%3E%3Crect x='100' y='100' width='200' height='120' fill='%238B4513' stroke='%23000' stroke-width='2'/%3E%3Crect x='110' y='110' width='180' height='40' fill='%23F5F5DC'/%3E%3Ctext x='200' y='260' font-size='20' fill='white' text-anchor='middle'%3EHarmonium%3C/text%3E%3C/svg%3E"
    },
    {
        id: 6,
        name: "Cuatro",
        region: "Caribbean - Venezuela/Puerto Rico",
        category: "String",
        description: "A four-string guitar popular in Caribbean and Latin American music, especially in Venezuela and Puerto Rico.",
        cultural: "The cuatro is essential to Latin American and Caribbean music traditions, representing the Spanish and Portuguese cultural influences on the region. It is prominent in Venezuelan and Puerto Rican music. In Guyana, the cuatro can be found in Indigenous genres such as Banchikilli and the Afro-Caribbean Kwadril of Mahdia.",
        technique: "Strummed with a pick or fingers, often using rapid rhythmic patterns. Players use various strumming techniques to create syncopated rhythms typical of Caribbean music.",
        materials: "Traditionally made from local hardwoods with nylon or steel strings. The body is smaller than a standard guitar with a distinctive high-pitched sound.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23191970' width='400' height='300'/%3E%3Cellipse cx='200' cy='180' rx='60' ry='80' fill='%23CD853F'/%3E%3Crect x='195' y='60' width='10' height='120' fill='%238B4513'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3ECuatro%3C/text%3E%3C/svg%3E"
    },
    {
        id: 7,
        name: "Indigenous Flute",
        region: "Guyana - Indigenous Americas",
        category: "Wind",
        description: "A traditional bamboo flute, representing indigenous wind instruments found across the Americas.",
        cultural: "Indigenous flutes connect communities to nature and ancestral traditions. Used in ceremonies, storytelling, and spiritual practices by Guyana's indigenous peoples including the Arawak, Carib, and Wapishana.",
        technique: "Blown from the top edge, producing sound through breath control and finger positioning. Requires mastery of breath techniques to produce the characteristic breathy, meditative tone.",
        materials: "Made from bamboo, traditionally with five finger holes. The bore and edge are carefully shaped to produce the desired tonal qualities.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23228B22' width='400' height='300'/%3E%3Crect x='180' y='50' width='40' height='200' fill='%23D2B48C' stroke='%238B7355' stroke-width='2'/%3E%3Ccircle cx='200' cy='100' r='4' fill='%23000'/%3E%3Ccircle cx='200' cy='150' r='4' fill='%23000'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3EFlute%3C/text%3E%3C/svg%3E"
    },
    {
        id: 8,
        name: "Dholak",
        region: "India/Guyana",
        category: "Percussion",
        description: "A two-headed hand drum used in folk and devotional music throughout the Indo-Guyanese community.",
        cultural: "The dholak is omnipresent in Indo-Guyanese celebrations, from birth ceremonies to weddings. It provides the rhythmic foundation for folk songs, devotional music, and dance performances.",
        technique: "Played with hands on both heads, with one side producing a higher pitch than the other. Players use various hand techniques to produce different tones and rhythms.",
        materials: "Wooden shell with goat skin heads. The bass head is often treated with a mixture of clay, oil, and other materials to produce a deeper sound.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23800020' width='400' height='300'/%3E%3Cellipse cx='200' cy='150' rx='100' ry='60' fill='%23A0522D'/%3E%3Cellipse cx='150' cy='150' rx='30' ry='60' fill='%23F5DEB3'/%3E%3Cellipse cx='250' cy='150' rx='30' ry='60' fill='%23F5DEB3'/%3E%3Ctext x='200' y='250' font-size='22' fill='white' text-anchor='middle'%3EDholak%3C/text%3E%3C/svg%3E"
    },
    // NEW INSTRUMENTS ADDED
    {
        id: 9,
        name: "Sitar",
        region: "India/Guyana",
        category: "String",
        description: "A plucked string instrument with sympathetic strings, iconic in Indian classical music and present in Indo-Guyanese cultural performances.",
        cultural: "The sitar represents the sophisticated classical music traditions of North India. In Guyana, it's played during cultural festivals and concerts, maintaining the connection to Indian classical heritage.",
        technique: "Played by plucking the main strings with a metal pick (mizrab) while manipulating the pitch with the left hand. The sympathetic strings create a rich, reverberating sound.",
        materials: "Made from teak or tun wood with a gourd resonator. Has 18-21 strings including main playing strings and sympathetic strings. The curved frets are adjustable.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23800000' width='400' height='300'/%3E%3Cellipse cx='200' cy='220' rx='70' ry='50' fill='%23D2691E'/%3E%3Crect x='195' y='60' width='10' height='160' fill='%238B4513'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3ESitar%3C/text%3E%3C/svg%3E"
    },
    {
        id: 10,
        name: "Tabla",
        region: "India/Guyana",
        category: "Percussion",
        description: "A pair of hand drums consisting of a smaller drum (dayan) and a larger bass drum (bayan), central to North Indian classical music.",
        cultural: "The tabla is essential to Indo-Guyanese classical music performances and devotional singing. Master tabla players are highly respected in the community.",
        technique: "Played with fingers and palms using complex hand movements. Different strokes produce distinct sounds that combine to create intricate rhythmic patterns (taals).",
        materials: "The dayan is typically made from rosewood, while the bayan is often made from brass or copper. Both have goat skin heads with a black tuning paste in the center.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%234B0082' width='400' height='300'/%3E%3Cellipse cx='150' cy='180' rx='50' ry='70' fill='%23D2691E'/%3E%3Cellipse cx='250' cy='180' rx='60' ry='80' fill='%23A9A9A9'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3ETabla%3C/text%3E%3C/svg%3E"
    },
    {
        id: 11,
        name: "Conch Shell (Sankha)",
        region: "Caribbean/India/Guyana",
        category: "Wind",
        description: "A large sea shell used as a ceremonial trumpet in Hindu rituals and Caribbean fishing communities.",
        cultural: "The conch shell holds sacred significance in Hindu ceremonies, blown during prayers and temple rituals. In Caribbean coastal communities, it's also used for signaling.",
        technique: "Blown like a trumpet by placing lips against the opening and buzzing to create sound. Requires strong breath control and embouchure.",
        materials: "Natural conch shell, usually from large marine gastropods. The tip is cut to create a mouthpiece.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%2320B2AA' width='400' height='300'/%3E%3Cpath d='M 150 150 Q 180 120 220 130 Q 250 140 240 180 Q 230 220 190 210 Z' fill='%23FFE4C4' stroke='%23DEB887' stroke-width='2'/%3E%3Ctext x='200' y='270' font-size='20' fill='white' text-anchor='middle'%3EConch Shell%3C/text%3E%3C/svg%3E"
    },
    {
        id: 12,
        name: "Maraca",
        region: "Caribbean/Indigenous Americas",
        category: "Percussion",
        description: "A rattle made from gourds filled with seeds or beads, essential to Caribbean and Latin American music.",
        cultural: "Maracas have indigenous origins and are used in various Caribbean musical styles. They're prominent in Venezuelan and Colombian music and in Guyanese Afro-Caribbean traditions such as the Kwadril of Mahdia and Masquerade. The maraca was used by Indigenous Peoples of the Lower Amazon in death rituals to communicate with the dead.",
        technique: "Shaken with a wrist motion to create rhythmic patterns. Usually played in pairs, one in each hand, to create complementary rhythms.",
        materials: "Traditionally made from dried gourds with handles, filled with seeds, beads, or small stones. Modern versions may use plastic or wood.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23FF6347' width='400' height='300'/%3E%3Cellipse cx='180' cy='120' rx='50' ry='60' fill='%23FFD700'/%3E%3Crect x='175' y='180' width='10' height='80' fill='%238B4513'/%3E%3Cellipse cx='220' cy='120' rx='50' ry='60' fill='%23FFD700'/%3E%3Crect x='215' y='180' width='10' height='80' fill='%238B4513'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3EMaracas%3C/text%3E%3C/svg%3E"
    },
    {
        id: 13,
        name: "Bongo Drums",
        region: "Caribbean/Africa - Cuba",
        category: "Percussion",
        description: "A pair of small open-bottomed hand drums of different sizes, essential to Afro-Cuban and Caribbean music.",
        cultural: "Bongos originated in Cuba, influenced by African drumming traditions. They're integral to Caribbean music styles and are used in Afro-Guyanese cultural performances.",
        technique: "Played with fingers and palms while held between the knees. The smaller drum (macho) plays higher patterns while the larger (hembra) provides the bass.",
        materials: "Made from hardwood shells with natural animal skin heads. Connected by a wooden bridge. Modern versions may use synthetic heads.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23006400' width='400' height='300'/%3E%3Cellipse cx='160' cy='150' rx='45' ry='70' fill='%238B4513'/%3E%3Cellipse cx='160' cy='100' rx='40' ry='15' fill='%23F5DEB3'/%3E%3Cellipse cx='240' cy='150' rx='55' ry='80' fill='%238B4513'/%3E%3Cellipse cx='240' cy='110' rx='50' ry='18' fill='%23F5DEB3'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3EBongos%3C/text%3E%3C/svg%3E"
    },
    {
        id: 14,
        name: "Conga Drums",
        region: "Caribbean/Africa - Cuba",
        category: "Percussion",
        description: "Tall, narrow, single-headed drums of African origin, fundamental to Latin and Caribbean music.",
        cultural: "Congas have Afro-Cuban origins and represent the continuity of African musical traditions in the Caribbean. Used in salsa, rumba, and other Caribbean genres popular in Guyana.",
        technique: "Played with hands and fingers using various techniques including open tones, slaps, and bass tones. Usually played in sets of 2-4 drums.",
        materials: "Made from wooden staves or fiberglass shells with animal skin or synthetic heads. Heights typically range from 28 to 30 inches.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%238B0000' width='400' height='300'/%3E%3Crect x='160' y='80' width='80' height='180' fill='%23CD853F' rx='10'/%3E%3Cellipse cx='200' cy='80' rx='40' ry='15' fill='%23F5DEB3'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3EConga%3C/text%3E%3C/svg%3E"
    },
    {
        id: 15,
        name: "Mbira (Thumb Piano)",
        region: "Africa - Zimbabwe",
        category: "Melodic Percussion",
        description: "A traditional African instrument with metal tines attached to a wooden board, plucked with the thumbs.",
        cultural: "The mbira is sacred in Shona culture and represents the spiritual connection between the living and ancestors. In Guyana, it symbolizes African heritage and is used in cultural education.",
        technique: "Played by plucking the metal tines with the thumbs and sometimes the index fingers. Different tines produce different pitches.",
        materials: "Made from a wooden soundboard with metal keys (traditionally made from iron or brass). Often placed inside a large gourd resonator for amplification.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23483D8B' width='400' height='300'/%3E%3Crect x='120' y='120' width='160' height='120' fill='%238B4513' rx='8'/%3E%3Cline x1='150' y1='130' x2='150' y2='220' stroke='%23C0C0C0' stroke-width='4'/%3E%3Cline x1='180' y1='130' x2='180' y2='220' stroke='%23C0C0C0' stroke-width='4'/%3E%3Cline x1='210' y1='130' x2='210' y2='220' stroke='%23C0C0C0' stroke-width='4'/%3E%3Cline x1='240' y1='130' x2='240' y2='220' stroke='%23C0C0C0' stroke-width='4'/%3E%3Ctext x='200' y='270' font-size='20' fill='white' text-anchor='middle'%3EMbira%3C/text%3E%3C/svg%3E"
    },
    {
        id: 16,
        name: "Kalimba",
        region: "Africa",
        category: "Melodic Percussion",
        description: "A modern variant of the mbira, with metal tines on a wooden box resonator.",
        cultural: "Related to traditional African instruments, the kalimba has gained worldwide popularity. It's used in music education and cultural programs in Guyana.",
        technique: "Plucked with the thumbs, creating a bright, bell-like tone. Easy to learn and portable.",
        materials: "Wooden resonating box with metal tines of varying lengths. Sometimes includes sound holes for resonance.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%232F4F4F' width='400' height='300'/%3E%3Crect x='130' y='100' width='140' height='150' fill='%23DEB887' rx='8'/%3E%3Crect x='145' y='90' width='110' height='20' fill='%23CD853F'/%3E%3Cline x1='160' y1='110' x2='160' y2='200' stroke='%23696969' stroke-width='3'/%3E%3Cline x1='180' y1='110' x2='180' y2='210' stroke='%23696969' stroke-width='3'/%3E%3Cline x1='200' y1='110' x2='200' y2='205' stroke='%23696969' stroke-width='3'/%3E%3Cline x1='220' y1='110' x2='220' y2='215' stroke='%23696969' stroke-width='3'/%3E%3Cline x1='240' y1='110' x2='240' y2='200' stroke='%23696969' stroke-width='3'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3EKalimba%3C/text%3E%3C/svg%3E"
    },
    {
        id: 17,
        name: "Berimbau",
        region: "Africa/Brazil",
        category: "String",
        description: "A single-string percussion instrument with a gourd resonator, iconic to Brazilian capoeira.",
        cultural: "The berimbau has African origins and is central to capoeira, the Afro-Brazilian martial art. It represents the African diaspora's cultural contributions to the Americas.",
        technique: "Played with a stick striking the string while a stone or coin changes the pitch. A shaker provides additional rhythm.",
        materials: "Made from a wooden bow (biriba wood), steel wire string, a dried gourd resonator, a stick, a stone, and a basket shaker.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23556B2F' width='400' height='300'/%3E%3Cpath d='M 150 50 Q 200 100 150 250' stroke='%238B4513' stroke-width='6' fill='none'/%3E%3Cline x1='150' y1='50' x2='150' y2='250' stroke='%23696969' stroke-width='2'/%3E%3Cellipse cx='150' cy='200' rx='30' ry='50' fill='%23DAA520'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3EBerimbau%3C/text%3E%3C/svg%3E"
    },
    {
        id: 18,
        name: "Talking Drum",
        region: "Africa - West Africa",
        category: "Percussion",
        description: "An hourglass-shaped drum with strings that can change pitch, capable of mimicking speech patterns.",
        cultural: "The talking drum is used for communication across distances and in storytelling. It represents the sophisticated communication systems of West African cultures.",
        technique: "Held under the arm, the player squeezes the strings to change pitch while striking with a curved stick. Can replicate tonal languages.",
        materials: "Carved from a single piece of wood with animal skin heads connected by leather strings. The tension strings allow pitch modulation.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%238B4513' width='400' height='300'/%3E%3Cpath d='M 180 80 L 150 150 L 180 220 L 220 220 L 250 150 L 220 80 Z' fill='%23CD853F'/%3E%3Cellipse cx='200' cy='80' rx='40' ry='15' fill='%23F5DEB3'/%3E%3Cellipse cx='200' cy='220' rx='40' ry='15' fill='%23F5DEB3'/%3E%3Cline x1='180' y1='85' x2='150' y2='145' stroke='%23F5DEB3' stroke-width='2'/%3E%3Cline x1='220' y1='85' x2='250' y2='145' stroke='%23F5DEB3' stroke-width='2'/%3E%3Ctext x='200' y='280' font-size='18' fill='white' text-anchor='middle'%3ETalking Drum%3C/text%3E%3C/svg%3E"
    },
    {
        id: 19,
        name: "Bansuri",
        region: "India/Guyana",
        category: "Wind",
        description: "A side-blown bamboo flute with six or seven open finger holes, central to Indian classical music.",
        cultural: "The bansuri is associated with Lord Krishna in Hindu mythology. In Indo-Guyanese culture, it's used in classical performances and devotional music.",
        technique: "Blown from the side with precise breath control. Finger positions and half-holing techniques create a wide range of notes and ornamentations.",
        materials: "Made from a single piece of bamboo with a blowing hole and finger holes. The interior is carefully crafted for proper resonance.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231E90FF' width='400' height='300'/%3E%3Crect x='100' y='140' width='200' height='20' fill='%23D2B48C' rx='10'/%3E%3Ccircle cx='130' cy='150' r='3' fill='%23000'/%3E%3Ccircle cx='160' cy='150' r='3' fill='%23000'/%3E%3Ccircle cx='190' cy='150' r='3' fill='%23000'/%3E%3Ccircle cx='220' cy='150' r='3' fill='%23000'/%3E%3Ccircle cx='250' cy='150' r='3' fill='%23000'/%3E%3Ccircle cx='270' cy='150' r='3' fill='%23000'/%3E%3Ctext x='200' y='200' font-size='20' fill='white' text-anchor='middle'%3EBansuri%3C/text%3E%3C/svg%3E"
    },
    {
        id: 20,
        name: "Shehnai",
        region: "India/Guyana",
        category: "Wind",
        description: "A double-reed woodwind instrument with a flared bell, traditionally played at weddings and ceremonies.",
        cultural: "The shehnai is considered auspicious in North Indian culture and is played during weddings, temple ceremonies, and festive occasions in the Indo-Guyanese community.",
        technique: "Played using circular breathing technique to produce continuous sound. The double reed is vibrated by the player's breath.",
        materials: "Made from wood (usually rosewood or black wood) with a metal bell at the end. Uses a double reed made from reed grass.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23FF8C00' width='400' height='300'/%3E%3Cpath d='M 150 150 L 200 145 L 240 155 L 260 170' stroke='%238B4513' stroke-width='15' fill='none'/%3E%3Ccircle cx='165' cy='149' r='2' fill='%23000'/%3E%3Ccircle cx='180' cy='148' r='2' fill='%23000'/%3E%3Ccircle cx='195' cy='147' r='2' fill='%23000'/%3E%3Ccircle cx='210' cy='147' r='2' fill='%23000'/%3E%3Ccircle cx='225' cy='149' r='2' fill='%23000'/%3E%3Cpath d='M 260 170 L 280 190' stroke='%23DAA520' stroke-width='20' fill='none'/%3E%3Ctext x='200' y='240' font-size='20' fill='white' text-anchor='middle'%3EShehnai%3C/text%3E%3C/svg%3E"
    },
    {
        id: 21,
        name: "Maracatu Drum",
        region: "Africa/Brazil",
        category: "Percussion",
        description: "A large Afro-Brazilian bass drum used in maracatu processions, representing African heritage in the Americas.",
        cultural: "Maracatu has roots in African slave communities in Brazil. The drum symbolizes resistance and cultural preservation, connecting to Afro-Guyanese heritage.",
        technique: "Played with a padded mallet, creating deep bass tones that anchor the rhythm section of maracatu ensembles.",
        materials: "Large wooden shell with animal skin heads. Often decorated with vibrant colors and patterns.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23FF1493' width='400' height='300'/%3E%3Cellipse cx='200' cy='150' rx='110' ry='90' fill='%238B4513'/%3E%3Cellipse cx='200' cy='90' rx='90' ry='30' fill='%23F5DEB3'/%3E%3Cellipse cx='200' cy='210' rx='90' ry='30' fill='%23F5DEB3'/%3E%3Ctext x='200' y='270' font-size='18' fill='white' text-anchor='middle'%3EMaracatu Drum%3C/text%3E%3C/svg%3E"
    },
    {
        id: 22,
        name: "Shekere",
        region: "Africa - West Africa",
        category: "Percussion",
        description: "A dried gourd covered with a net of beads or shells, creating rhythmic patterns when shaken or struck.",
        cultural: "The shekere is used in Yoruba religious ceremonies and celebrations. It represents African spiritual traditions and community music-making.",
        technique: "Played by shaking, striking, or rotating the gourd. The beads create various sounds depending on the technique.",
        materials: "Made from a dried and hollowed gourd covered with a hand-woven net strung with beads, shells, or seeds.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%234B0082' width='400' height='300'/%3E%3Cellipse cx='200' cy='180' rx='80' ry='100' fill='%23DAA520'/%3E%3Cpath d='M 200 80 Q 200 70 200 60' stroke='%238B4513' stroke-width='8' fill='none'/%3E%3Ccircle cx='140' cy='140' r='4' fill='%23FFF'/%3E%3Ccircle cx='170' cy='160' r='4' fill='%23FFF'/%3E%3Ccircle cx='200' cy='180' r='4' fill='%23FFF'/%3E%3Ccircle cx='230' cy='160' r='4' fill='%23FFF'/%3E%3Ccircle cx='260' cy='140' r='4' fill='%23FFF'/%3E%3Ctext x='200' y='280' font-size='20' fill='white' text-anchor='middle'%3EShekere%3C/text%3E%3C/svg%3E"
    },
    {
        id: 23,
        name: "Chak-Chak",
        region: "Caribbean - Trinidad",
        category: "Percussion",
        description: "A pair of metal shakers made from small tins filled with seeds or beads, essential to calypso and soca music.",
        cultural: "The chak-chak is integral to Trinidadian music and is used throughout the Caribbean. It provides the rhythmic backbone for calypso, soca, and parang music in Guyana.",
        technique: "Shaken in rhythmic patterns, often in pairs. The player creates syncopated rhythms that complement other percussion instruments.",
        materials: "Made from small cylindrical metal containers filled with seeds, beads, or small pebbles. Handles are usually made from wood or metal.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23FF4500' width='400' height='300'/%3E%3Crect x='140' y='120' width='30' height='50' fill='%23C0C0C0' rx='5'/%3E%3Crect x='140' y='170' width='30' height='40' fill='%238B4513' rx='5'/%3E%3Crect x='230' y='120' width='30' height='50' fill='%23C0C0C0' rx='5'/%3E%3Crect x='230' y='170' width='30' height='40' fill='%238B4513' rx='5'/%3E%3Ctext x='200' y='250' font-size='20' fill='white' text-anchor='middle'%3EChak-Chak%3C/text%3E%3C/svg%3E"
    },
    {
        id: 24,
        name: "Sambura",
        region: "Guyana - Indigenous Americas",
        category: "Percussion",
        description: "A traditional one-sided Indigenous drum. This entry reflects the broader Indigenous form and is separate from the Lokono Sambura/box-bass variant used in Banchikilli contexts.",
        cultural: "Honors Indigenous community practice while noting the Lokono of Santa Rosa also use a Sambura-like box-bass in Banchikilli settings; historically fitted with rattles to add shimmer and drive during storytelling and communal gatherings.",
        technique: "Played on the single head with hands or a light beater; players vary striking zones for tone and may let attached rattles buzz for extra texture.",
        materials: "Box-style wooden frame with a single skin head; sometimes fitted with gourd or seed rattles and fiber lashings for resonance.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23006452' width='400' height='300'/%3E%3Cpath d='M 140 60 Q 200 150 140 240' stroke='%238B4513' stroke-width='6' fill='none'/%3E%3Cline x1='140' y1='60' x2='140' y2='240' stroke='%23C0C0C0' stroke-width='2'/%3E%3Cellipse cx='150' cy='200' rx='30' ry='45' fill='%23DAA520'/%3E%3Ctext x='220' y='260' font-size='20' fill='white' text-anchor='middle'%3ESambura%3C/text%3E%3C/svg%3E"
    }
];

// Rhythm Patterns Database
const rhythmPatterns = [
    {
        id: 1,
        name: "Chutney Rhythm",
        region: "Indo-Guyanese",
        description: "Fast-paced rhythm pattern characteristic of chutney music, combining Indian folk rhythms with Caribbean influences. Features syncopated beats typically in 4/4 time with accents on the off-beats.",
        pattern: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        tempo: 140
    },
    {
        id: 2,
        name: "Calypso Beat",
        region: "Caribbean",
        description: "Classic Caribbean rhythm with emphasis on the second and fourth beats, creating a distinctive swing. Originated in Trinidad and popular throughout the Caribbean including Guyana.",
        pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        tempo: 120
    },
    {
        id: 3,
        name: "Tassa Pattern",
        region: "Indo-Guyanese",
        description: "Rapid, complex rhythm played on tassa drums during processions. Features intricate patterns passed down through generations in the Indo-Guyanese Muslim community.",
        pattern: [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
        tempo: 160
    },
    {
        id: 4,
        name: "Soca Rhythm",
        region: "Caribbean",
        description: "High-energy rhythm that fuses soul and calypso. Characterized by a driving beat and heavy use of synthesizers in modern versions. Popular at carnival celebrations.",
        pattern: [1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
        tempo: 135
    },
    {
        id: 5,
        name: "African Polyrhythm",
        region: "West Africa",
        description: "Complex layered rhythm typical of West African drumming traditions. Multiple rhythms played simultaneously to create a rich, interlocking pattern.",
        pattern: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
        tempo: 110
    },
    {
        id: 6,
        name: "Reggae One Drop",
        region: "Caribbean - Jamaica",
        description: "Iconic reggae groove with the kick+snare drop landing on the backbeat. Laid-back feel with drops on beats 2 and 4 and a slower pulse, common in roots reggae.",
        pattern: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        tempo: 70
    },
    {
        id: 7,
        name: "Bhangra Beat",
        region: "India/Punjab",
        description: "Energetic rhythm from Punjab, India. Used in celebrations and weddings in the Indo-Guyanese community. Features driving dhol patterns.",
        pattern: [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
        tempo: 150
    },
    {
        id: 8,
        name: "Rumba Clave",
        region: "Caribbean - Cuba",
        description: "Fundamental Afro-Cuban rhythm pattern. The 3-2 rumba clave is the heartbeat of much Caribbean and Latin music.",
        pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        tempo: 100
    },
    {
        id: 9,
        name: "Son Clave",
        region: "Caribbean - Cuba",
        description: "Another essential Cuban rhythm pattern. The son clave is slightly different from rumba clave and forms the basis of salsa music.",
        pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        tempo: 110
    },
    {
        id: 10,
        name: "Parang Rhythm",
        region: "Indigenous Americas/Africa",
        description: "Traditional rhythm found in Indigenous and African musical traditions. Features a distinctive syncopated pattern with roots in ancestral practices.",
        pattern: [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        tempo: 125
    },
    {
        id: 11,
        name: "Banchikilli",
        region: "Guyana - Indigenous",
        description: "Banchikilli is a hybrid genre that fuses ancient Lokono melodies with Venezuela's creole Joropo. The Banchikilli is performed exclusively by the Lokonos of Santa Rosa, Moruca. It features syncopated patterns used in ceremonial and social gatherings.",
        pattern: [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
        tempo: 115
    },
    {
        id: 12,
        name: "Masquerade",
        region: "Guyana - Afro-Caribbean",
        description: "Afro-Caribbean rhythm tradition from Guyana, associated with Emancipation; mostly performed for Republic Anniversary and during the Christmas Season. Features strong syncopation and celebratory energy.",
        pattern: [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0],
        tempo: 128
    }
];

// State Management
let currentInstruments = [...instrumentsDatabase];
let selectedRhythm = null;
let rhythmInterval = null;
let currentBeat = 0;

// DOM Elements
const instrumentsGrid = document.getElementById('instrumentsGrid');
const searchInput = document.getElementById('searchInput');
const regionFilter = document.getElementById('regionFilter');
const instrumentDetail = document.getElementById('instrumentDetail');
const closeDetail = document.getElementById('closeDetail');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded firing');
    renderInstruments(currentInstruments);
    setupLocalNotice();
    setupEventListeners();
    setupRhythmStudio();
    setupQuizControls();
    setupFavoritesAndComparison();
    console.log('About to setup music analysis');
    setupMusicAnalysis();
    console.log('Setup complete');
});

// Event Listeners Setup
function setupEventListeners() {
    // Tab Navigation
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });

    // Search and Filter
    searchInput.addEventListener('input', filterInstruments);
    regionFilter.addEventListener('change', filterInstruments);

    // Detail Modal
    closeDetail.addEventListener('click', () => {
        instrumentDetail.style.display = 'none';
    });

    instrumentDetail.addEventListener('click', (e) => {
        if (e.target === instrumentDetail) {
            instrumentDetail.style.display = 'none';
        }
    });
}

function setupLocalNotice() {
    const notice = document.getElementById('localNotice');
    if (!notice) return;

    const isFile = location.protocol === 'file:' || location.hostname === '';
    if (!isFile) return;

    notice.classList.add('is-visible');

    const localUrl = 'http://localhost:5173/index.html';
    const urlEl = document.getElementById('localUrl');
    if (urlEl) {
        urlEl.textContent = localUrl;
    }

    const copyBtn = document.getElementById('copyLocalhostLink');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(localUrl);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy localhost link';
                }, 2000);
            } else {
                window.prompt('Copy this link:', localUrl);
            }
        } catch (err) {
            console.error('Copy failed:', err);
            window.prompt('Copy this link:', localUrl);
        }
    });
}

// Tab Switching
function switchTab(tabName) {
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName) {
            content.classList.add('active');
        }
    });
}

// Render Instruments
function renderInstruments(instruments) {
    if (instruments.length === 0) {
        instrumentsGrid.innerHTML = '<div class="loading">No instruments found. Try adjusting your search.</div>';
        return;
    }

    instrumentsGrid.innerHTML = instruments.map(instrument => `
        <div class="instrument-card" data-id="${instrument.id}" data-instrument-id="${instrument.id}">
            <img src="${instrument.image}" alt="${instrument.name}">
            <div class="instrument-card-content">
                <h3>${instrument.name}</h3>
                <p class="region">${instrument.region}</p>
                <p>${instrument.description.substring(0, 100)}...</p>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.instrument-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            showInstrumentDetail(id);
        });
    });
}

// Filter Instruments
function filterInstruments() {
    const searchTerm = searchInput.value.toLowerCase();
    const region = regionFilter.value;

    currentInstruments = instrumentsDatabase.filter(instrument => {
        const matchesSearch = instrument.name.toLowerCase().includes(searchTerm) ||
                            instrument.description.toLowerCase().includes(searchTerm) ||
                            instrument.region.toLowerCase().includes(searchTerm);
        
        const matchesRegion = region === 'all' || instrument.region.toLowerCase().includes(region);

        return matchesSearch && matchesRegion;
    });

    renderInstruments(currentInstruments);
}

// Show Instrument Detail
function showInstrumentDetail(id) {
    console.log('showInstrumentDetail called with id:', id);
    const instrument = instrumentsDatabase.find(i => i.id === id);
    if (!instrument) {
        console.error('Instrument not found with id:', id);
        return;
    }

    try {
        const detailPanel = document.getElementById('instrumentDetail');
        if (!detailPanel) {
            console.error('Detail panel element not found with id: instrumentDetail');
            return;
        }

        document.getElementById('detailImage').src = instrument.image;
        document.getElementById('detailName').textContent = instrument.name;
        document.getElementById('detailRegion').textContent = instrument.region;
        document.getElementById('detailDescription').textContent = instrument.description;
        document.getElementById('detailCultural').textContent = instrument.cultural;
        document.getElementById('detailTechnique').textContent = instrument.technique;
        document.getElementById('detailMaterials').textContent = instrument.materials;
        
        detailPanel.style.display = 'block';
        console.log('Instrument detail displayed for:', instrument.name);
    } catch (e) {
        console.error('Error in showInstrumentDetail:', e.message, e);
    }
}

// Rhythm Studio Setup
function setupRhythmStudio() {
    const rhythmButtons = document.getElementById('rhythmButtons');
    const canvas = document.getElementById('rhythmCanvas');
    const ctx = canvas.getContext('2d');
    const playBtn = document.getElementById('playRhythm');
    const stopBtn = document.getElementById('stopRhythm');
    const tempoSlider = document.getElementById('tempoSlider');
    const tempoValue = document.getElementById('tempoValue');

    // Render rhythm buttons
    rhythmButtons.innerHTML = rhythmPatterns.map(rhythm => `
        <button class="rhythm-btn" data-id="${rhythm.id}">${rhythm.name}</button>
    `).join('');

    // Rhythm button handlers
    rhythmButtons.querySelectorAll('.rhythm-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            rhythmButtons.querySelectorAll('.rhythm-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedRhythm = rhythmPatterns.find(r => r.id === parseInt(btn.dataset.id));
            rhythmAudioFailed = false;
            displayRhythmInfo(selectedRhythm);
            drawRhythmPattern(ctx, canvas, selectedRhythm);
        });
    });

    // Play/Stop controls
    playBtn.addEventListener('click', () => {
        if (!selectedRhythm) {
            alert('Please select a rhythm pattern first!');
            return;
        }
        // Initialize audio on user click
        if (!audioContext) {
            initAudioContext();
        }
        playRhythm(ctx, canvas, selectedRhythm);
    });

    stopBtn.addEventListener('click', stopRhythm);

    // Tempo slider
    tempoSlider.addEventListener('input', () => {
        tempoValue.textContent = tempoSlider.value;
        if (rhythmInterval && selectedRhythm) {
            stopRhythm();
            playRhythm(ctx, canvas, selectedRhythm);
        }
    });

    // Set default rhythm
    selectedRhythm = rhythmPatterns[0];
    rhythmButtons.querySelector('.rhythm-btn').classList.add('active');
    displayRhythmInfo(selectedRhythm);
    drawRhythmPattern(ctx, canvas, selectedRhythm);
}

function displayRhythmInfo(rhythm) {
    document.getElementById('rhythmDescription').textContent = rhythm.description;
    const statusEl = document.getElementById('rhythmAudioStatus');
    if (statusEl) {
        if (rhythm.audio) {
            statusEl.textContent = 'Audio: ready to play (Joropo sample).';
        } else {
            statusEl.textContent = 'Audio: using synthesized clicks.';
        }
    }
}

function drawRhythmPattern(ctx, canvas, rhythm) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const beatWidth = canvas.width / rhythm.pattern.length;
    const beatHeight = 100;
    const yOffset = (canvas.height - beatHeight) / 2;

    rhythm.pattern.forEach((beat, index) => {
        const x = index * beatWidth;
        const height = beat ? beatHeight : beatHeight / 3;
        const y = yOffset + (beatHeight - height) / 2;

        ctx.fillStyle = beat ? '#2c5f2d' : '#666';
        ctx.fillRect(x + 5, y, beatWidth - 10, height);
        
        // Beat number
        ctx.fillStyle = '#fff';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(index + 1, x + beatWidth / 2, canvas.height - 10);
    });
}

function playRhythm(ctx, canvas, rhythm) {
    stopRhythm();
    currentBeat = 0;
    
    // Initialize audio context if needed for synthesized sounds
    if (!audioContext) {
        initAudioContext();
    }
    
    const tempo = parseInt(document.getElementById('tempoSlider').value);
    const beatDuration = (60 / tempo) * 1000 / 4; // 16th notes

    if (rhythm.audio && !rhythmAudioFailed) {
        if (!rhythmAudioElement || rhythmAudioElement.src.indexOf(rhythm.audio) === -1) {
            rhythmAudioElement = new Audio(rhythm.audio);
            rhythmAudioElement.loop = true;
            rhythmAudioElement.preload = 'auto';
            rhythmAudioElement.addEventListener('error', () => {
                rhythmAudioFailed = true;
                const statusEl = document.getElementById('rhythmAudioStatus');
                if (statusEl) {
                    statusEl.textContent = 'Audio failed to load. Using synthesized clicks instead.';
                }
            });
            rhythmAudioElement.addEventListener('canplaythrough', () => {
                const statusEl = document.getElementById('rhythmAudioStatus');
                if (statusEl) {
                    statusEl.textContent = 'Audio: playing Joropo sample.';
                }
            }, { once: true });
        }
        const baseTempo = rhythm.tempo || 120;
        const tempoRatio = Math.max(0.5, Math.min(2.0, tempo / baseTempo));
        rhythmAudioElement.playbackRate = tempoRatio;
        rhythmAudioElement.currentTime = 0;
        rhythmAudioElement.play().catch(err => {
            rhythmAudioFailed = true;
            console.error('Rhythm audio playback failed:', err);
            const statusEl = document.getElementById('rhythmAudioStatus');
            if (statusEl) {
                statusEl.textContent = 'Audio playback failed. Using synthesized clicks instead.';
            }
        });
    }

    rhythmInterval = setInterval(() => {
        drawRhythmPattern(ctx, canvas, rhythm);
        
        // Highlight current beat
        const beatWidth = canvas.width / rhythm.pattern.length;
        const x = currentBeat * beatWidth;
        ctx.fillStyle = 'rgba(253, 197, 0, 0.5)';
        ctx.fillRect(x, 0, beatWidth, canvas.height);

        // Play sound with Web Audio API
        if ((!rhythm.audio || rhythmAudioFailed) && rhythm.pattern[currentBeat]) {
            playBeatSound();
        }

        currentBeat = (currentBeat + 1) % rhythm.pattern.length;
    }, beatDuration);
}

function stopRhythm() {
    if (rhythmInterval) {
        clearInterval(rhythmInterval);
        rhythmInterval = null;
        currentBeat = 0;
        if (selectedRhythm) {
            const canvas = document.getElementById('rhythmCanvas');
            const ctx = canvas.getContext('2d');
            drawRhythmPattern(ctx, canvas, selectedRhythm);
        }
    }

    if (rhythmAudioElement) {
        rhythmAudioElement.pause();
        rhythmAudioElement.currentTime = 0;
    }

    const statusEl = document.getElementById('rhythmAudioStatus');
    if (statusEl && selectedRhythm) {
        if (selectedRhythm.audio && !rhythmAudioFailed) {
            statusEl.textContent = 'Audio: ready to play (Joropo sample).';
        }
    }
}

// Audio Synthesis with Web Audio API
let audioContext = null;
let rhythmAudioElement = null;
let rhythmAudioFailed = false;

function initAudioContext() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Audio context created, state:', audioContext.state);
            
            // Resume audio context if suspended
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('Audio context resumed on init');
                });
            }
        } catch (e) {
            console.error('Web Audio API not supported:', e);
            alert('Audio not supported in this browser. Visual rhythm display will work without sound.');
        }
    }
    return audioContext;
}

function playBeatSound() {
    try {
        if (!audioContext) {
            console.log('Audio context not initialized');
            return;
        }
        
        // Resume if suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('Audio context resumed');
            });
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Use different frequencies based on rhythm pattern for variety
        let frequency = 200;
        if (selectedRhythm) {
            const rhythmId = selectedRhythm.id;
            const frequencies = [200, 250, 300, 180, 220, 240, 260, 280, 320, 340, 360, 380];
            frequency = frequencies[rhythmId % frequencies.length];
        }
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'triangle'; // More noticeable than sine
        
        // Louder initial volume
        gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        
        console.log('Beat played with frequency:', frequency, 'audio state:', audioContext.state);
    } catch (e) {
        console.error('Error playing beat sound:', e);
    }
}

// Quiz System
const quizQuestions = [
    {
        question: "Which instrument is made from oil drums and is the national instrument of Trinidad and Tobago?",
        options: ["Dhol", "Steel Pan", "Djembe", "Tassa"],
        correct: 1,
        explanation: "The Steel Pan was invented in Trinidad and Tobago, made from 55-gallon oil drums, and is now the national instrument."
    },
    {
        question: "What is the traditional use of Tassa drums in Guyanese culture?",
        options: ["Wedding celebrations only", "Religious processions and festivals", "Fishing ceremonies", "Harvest festivals"],
        correct: 1,
        explanation: "Tassa drums are played during Muslim celebrations like Hosay and Hindu festivals, accompanying street processions."
    },
    {
        question: "Which instrument is associated with Lord Krishna in Hindu mythology?",
        options: ["Harmonium", "Bansuri", "Sitar", "Tabla"],
        correct: 1,
        explanation: "The Bansuri (bamboo flute) is closely associated with Lord Krishna in Hindu mythology and Indian classical music."
    },
    {
        question: "What makes the Talking Drum unique among African percussion instruments?",
        options: ["It's the largest drum", "It can change pitch to mimic speech", "It's made of metal", "It uses electronic amplification"],
        correct: 1,
        explanation: "The Talking Drum can change pitch by squeezing the tension strings, allowing it to mimic tonal languages and speech patterns."
    },
    {
        question: "Which rhythm pattern is characteristic of Indo-Guyanese chutney music?",
        options: ["Reggae One Drop", "Chutney Rhythm", "Rumba Clave", "Calypso Beat"],
        correct: 1,
        explanation: "Chutney Rhythm is a fast-paced pattern combining Indian folk rhythms with Caribbean influences, typical of chutney music."
    },
    {
        question: "What is the primary material used to make a traditional Djembe?",
        options: ["Bamboo", "Metal", "A single piece of hardwood", "Plastic"],
        correct: 2,
        explanation: "Traditional djembes are carved from a single piece of hardwood, usually lenke or dimba wood, with a goatskin head."
    },
    {
        question: "Which instrument pair is central to North Indian classical music?",
        options: ["Bongo and Conga", "Tabla (dayan and bayan)", "Steel Pans", "Tassa Drums"],
        correct: 1,
        explanation: "The Tabla consists of a pair of hand drums - the smaller dayan and larger bayan - central to North Indian classical music."
    },
    {
        question: "What is Masquerade music in Guyana?",
        options: ["Carnival music", "Christmas music with Spanish-Venezuelan origins", "Emancipation-era Afro-Caribbean tradition", "Children's songs"],
        correct: 2,
        explanation: "Masquerade is an Afro-Caribbean music and dance tradition in Guyana tied to Emancipation celebrations and festive community performances."
    },
    {
        question: "Which instrument is played during Hindu devotional singing (bhajans)?",
        options: ["Harmonium", "Steel Pan", "Djembe", "Berimbau"],
        correct: 0,
        explanation: "The Harmonium is central to Hindu devotional singing in Guyana, accompanying bhajans, kirtans, and religious ceremonies."
    },
    {
        question: "What is the origin of the Mbira (thumb piano)?",
        options: ["India", "Caribbean", "Zimbabwe (Africa)", "Brazil"],
        correct: 2,
        explanation: "The Mbira originates from Zimbabwe and is sacred in Shona culture, representing spiritual connections with ancestors."
    },
    {
        question: "How many strings does a traditional Cuatro have?",
        options: ["Four", "Six", "Eight", "Twelve"],
        correct: 0,
        explanation: "The Cuatro, meaning 'four' in Spanish, is a four-string guitar popular in Caribbean and Latin American music."
    },
    {
        question: "Which rhythm is known as the heartbeat of much Caribbean and Latin music?",
        options: ["Bhangra Beat", "Tassa Pattern", "Rumba Clave", "Reggae One Drop"],
        correct: 2,
        explanation: "The Rumba Clave (3-2 pattern) is the fundamental rhythm that forms the heartbeat of Caribbean and Latin music."
    },
    {
        question: "What technique is required to play the Shehnai continuously?",
        options: ["Foot pedaling", "Circular breathing", "Electronic looping", "String plucking"],
        correct: 1,
        explanation: "The Shehnai requires circular breathing technique to produce continuous sound, a skill that takes years to master."
    },
    {
        question: "Which instrument is traditionally blown during Hindu ceremonies and prayers?",
        options: ["Bansuri", "Conch Shell (Sankha)", "Shehnai", "Flute"],
        correct: 1,
        explanation: "The Conch Shell (Sankha) holds sacred significance in Hindu ceremonies and is blown during prayers and temple rituals."
    },
    {
        question: "What are the three main sounds produced by a Djembe?",
        options: ["High, Medium, Low", "Bass, Tone, Slap", "Ping, Pong, Bang", "Sharp, Soft, Silent"],
        correct: 1,
        explanation: "The Djembe produces three main sounds: bass (center), tone (edge), and slap (rim), which combine for complex rhythms."
    }
];

// Expose quiz questions for hotfixes
window.quizQuestions = quizQuestions;

let currentQuestionIndex = 0;
let quizScore = 0;
let correctAnswersCount = 0;
let totalQuestionsAnswered = 0;
let shuffledQuestions = [];

window.currentQuestionIndex = currentQuestionIndex;
window.shuffledQuestions = shuffledQuestions;

function startQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    correctAnswersCount = 0;
    totalQuestionsAnswered = 0;
    shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    window.currentQuestionIndex = currentQuestionIndex;
    window.shuffledQuestions = shuffledQuestions;
    
    // Ensure elements exist before showing
    const startBtn = document.getElementById('startQuiz');
    const resetBtn = document.getElementById('resetQuiz');
    const questionCard = document.getElementById('questionCard');
    
    if (startBtn) startBtn.style.display = 'none';
    if (resetBtn) resetBtn.style.display = 'none';
    if (questionCard) questionCard.style.display = 'block';
    
    updateQuizStats();
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = shuffledQuestions[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const quizFeedback = document.getElementById('quizFeedback');
    const answerOptions = document.getElementById('answerOptions');
    const nextButton = document.getElementById('nextQuestion');
    
    if (!questionText || !quizFeedback || !answerOptions) {
        console.error('Quiz elements not found. Resetting quiz...');
        resetQuiz();
        return;
    }
    
    questionText.textContent = question.question;
    quizFeedback.style.display = 'none';
    if (nextButton) nextButton.style.display = 'none';
    
    answerOptions.innerHTML = question.options.map((option, index) => 
        `<div class="answer-option" data-index="${index}">${option}</div>`
    ).join('');
    
    answerOptions.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', () => selectAnswer(parseInt(option.dataset.index)));
    });
}

window.loadQuestion = loadQuestion;

function selectAnswer(selectedIndex) {
    const question = shuffledQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.answer-option');
    const feedback = document.getElementById('quizFeedback');
    
    options.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === question.correct) {
            option.classList.add('correct');
        }
        if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    totalQuestionsAnswered++;
    
    if (selectedIndex === question.correct) {
        correctAnswersCount++;
        quizScore += 10;
        feedback.className = 'quiz-feedback correct';
        feedback.innerHTML = `<strong>✓ Correct!</strong><br>${question.explanation}`;
    } else {
        feedback.className = 'quiz-feedback incorrect';
        feedback.innerHTML = `<strong>✗ Incorrect.</strong><br>The correct answer is: ${question.options[question.correct]}<br>${question.explanation}`;
    }
    
    feedback.style.display = 'block';
    document.getElementById('nextQuestion').style.display = 'block';
    updateQuizStats();
}

function nextQuestion() {
    currentQuestionIndex++;
    window.currentQuestionIndex = currentQuestionIndex;
    loadQuestion();
}

function endQuiz() {
    const percentage = Math.round((correctAnswersCount / totalQuestionsAnswered) * 100);
    let message = '';
    
    if (percentage >= 90) {
        message = '🏆 Outstanding! You\'re an ethnomusicology expert!';
    } else if (percentage >= 70) {
        message = '🎵 Great job! You know your instruments well!';
    } else if (percentage >= 50) {
        message = '👍 Good effort! Keep exploring to learn more!';
    } else {
        message = '📚 Keep learning! There\'s so much to discover!';
    }
    
    document.getElementById('questionCard').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2>Quiz Complete!</h2>
            <p style="font-size: 1.5rem; margin: 30px 0;">${message}</p>
            <p style="font-size: 1.2rem;">Final Score: ${quizScore} points</p>
            <p style="font-size: 1.2rem;">Correct Answers: ${correctAnswersCount} / ${totalQuestionsAnswered}</p>
            <p style="font-size: 1.2rem;">Percentage: ${percentage}%</p>
        </div>
    `;
    
    document.getElementById('resetQuiz').style.display = 'inline-block';
}

function updateQuizStats() {
    document.getElementById('quizScore').textContent = quizScore;
    document.getElementById('correctAnswers').textContent = correctAnswersCount;
    document.getElementById('totalQuestions').textContent = totalQuestionsAnswered;
}

function resetQuiz() {
    document.getElementById('startQuiz').style.display = 'inline-block';
    document.getElementById('resetQuiz').style.display = 'none';
    document.getElementById('questionCard').style.display = 'block';
    document.getElementById('questionCard').innerHTML = `
        <h3 id="questionText"></h3>
        <div class="answer-options" id="answerOptions"></div>
        <div class="quiz-feedback" id="quizFeedback" style="display: none;"></div>
        <button class="control-btn" id="nextQuestion" style="display: none;">Next Question</button>
    `;
}

// Favorites System
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFavorite(instrumentId) {
    const index = favorites.indexOf(instrumentId);
    if (index === -1) {
        favorites.push(instrumentId);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesDisplay();
    updateFavoriteButton();
}

function updateFavoritesDisplay() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const favoriteInstruments = instrumentsDatabase.filter(i => favorites.includes(i.id));
    
    if (favoriteInstruments.length === 0) {
        favoritesGrid.innerHTML = '<div class="favorites-empty">No favorites yet. Add instruments from the Explorer tab!</div>';
    } else {
        renderInstrumentsInGrid(favoriteInstruments, favoritesGrid);
    }
}

function clearFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
        favorites = [];
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesDisplay();
    }
}

function updateFavoriteButton() {
    const btn = document.getElementById('addToFavorites');
    const currentId = parseInt(btn.dataset.instrumentId);
    if (favorites.includes(currentId)) {
        btn.textContent = '⭐ Remove from Favorites';
        btn.classList.add('active');
    } else {
        btn.textContent = '⭐ Add to Favorites';
        btn.classList.remove('active');
    }
}

// Comparison System
let comparison = JSON.parse(sessionStorage.getItem('comparison') || '[]');

function toggleComparison(instrumentId) {
    const index = comparison.indexOf(instrumentId);
    if (index === -1) {
        if (comparison.length >= 4) {
            alert('You can compare up to 4 instruments at a time. Remove one first.');
            return;
        }
        comparison.push(instrumentId);
    } else {
        comparison.splice(index, 1);
    }
    sessionStorage.setItem('comparison', JSON.stringify(comparison));
    updateComparisonDisplay();
    updateCompareButton();
}

function updateComparisonDisplay() {
    const compareGrid = document.getElementById('compareGrid');
    const compareInstruments = instrumentsDatabase.filter(i => comparison.includes(i.id));
    
    if (compareInstruments.length === 0) {
        compareGrid.innerHTML = '<div class="compare-empty">No instruments selected for comparison. Add instruments from the Explorer tab.</div>';
    } else {
        compareGrid.innerHTML = compareInstruments.map(instrument => `
            <div class="compare-card">
                <button class="remove-btn" onclick="toggleComparison(${instrument.id})">×</button>
                <img src="${instrument.image}" alt="${instrument.name}">
                <h3>${instrument.name}</h3>
                <div class="compare-detail"><strong>Region:</strong> ${instrument.region}</div>
                <div class="compare-detail"><strong>Category:</strong> ${instrument.category}</div>
                <div class="compare-detail"><strong>Materials:</strong> ${instrument.materials.substring(0, 100)}...</div>
                <div class="compare-detail"><strong>Technique:</strong> ${instrument.technique.substring(0, 100)}...</div>
            </div>
        `).join('');
    }
}

function clearComparison() {
    if (confirm('Are you sure you want to clear all comparisons?')) {
        comparison = [];
        sessionStorage.setItem('comparison', JSON.stringify(comparison));
        updateComparisonDisplay();
    }
}

function updateCompareButton() {
    const btn = document.getElementById('addToCompare');
    const currentId = parseInt(btn.dataset.instrumentId);
    if (comparison.includes(currentId)) {
        btn.textContent = '⚖️ Remove from Compare';
        btn.classList.add('active');
    } else {
        btn.textContent = '⚖️ Add to Compare';
        btn.classList.remove('active');
    }
}

function renderInstrumentsInGrid(instruments, container) {
    container.innerHTML = instruments.map(instrument => `
        <div class="instrument-card" data-id="${instrument.id}" data-instrument-id="${instrument.id}">
            <img src="${instrument.image}" alt="${instrument.name}">
            <div class="instrument-card-content">
                <h3>${instrument.name}</h3>
                <p class="region">${instrument.region}</p>
                <p>${instrument.description.substring(0, 100)}...</p>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.instrument-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            showInstrumentDetail(id);
        });
    });
}

// Enhanced Show Instrument Detail with Favorites/Compare
function showInstrumentDetailEnhanced(id) {
    console.log('showInstrumentDetailEnhanced called with id:', id);
    const instrument = instrumentsDatabase.find(i => i.id === id);
    if (!instrument) {
        console.error('Instrument not found with id:', id);
        return;
    }

    try {
        const detailPanel = document.getElementById('instrumentDetail');
        if (!detailPanel) {
            console.error('Detail panel element not found');
            return;
        }

        document.getElementById('detailImage').src = instrument.image;
        document.getElementById('detailName').textContent = instrument.name;
        document.getElementById('detailRegion').textContent = instrument.region;
        document.getElementById('detailDescription').textContent = instrument.description;
        document.getElementById('detailCultural').textContent = instrument.cultural;
        document.getElementById('detailTechnique').textContent = instrument.technique;
        document.getElementById('detailMaterials').textContent = instrument.materials;
        
        // Set up action buttons
        try {
            document.getElementById('addToFavorites').dataset.instrumentId = id;
            document.getElementById('addToCompare').dataset.instrumentId = id;
            updateFavoriteButton();
            updateCompareButton();
        } catch (e) {
            console.log('Note: Favorites/Compare buttons may not be available in all views: ' + e.message);
        }

        detailPanel.style.display = 'block';
        detailPanel.style.visibility = 'visible';
        detailPanel.style.opacity = '1';
        
        console.log('Detail panel display set to:', detailPanel.style.display);
        console.log('Detail panel visibility set to:', detailPanel.style.visibility);
        console.log('Detail panel opacity set to:', detailPanel.style.opacity);
        console.log('Detail panel computed style display:', window.getComputedStyle(detailPanel).display);
        console.log('Detail panel computed style visibility:', window.getComputedStyle(detailPanel).visibility);
        console.log('Detail panel computed style opacity:', window.getComputedStyle(detailPanel).opacity);
        console.log('Instrument detail displayed for:', instrument.name);
    } catch (e) {
        console.error('Error in showInstrumentDetailEnhanced:', e.message, e);
    }
}

// Initialize Quiz Controls
function setupQuizControls() {
    document.getElementById('startQuiz').addEventListener('click', startQuiz);
    document.getElementById('resetQuiz').addEventListener('click', () => {
        resetQuiz();
        startQuiz();
    });
    
    // Use event delegation for next button since it's recreated
    document.getElementById('quizContent').addEventListener('click', (e) => {
        if (e.target.id === 'nextQuestion') {
            nextQuestion();
        }
    });
}

// Initialize Favorites and Comparison
function setupFavoritesAndComparison() {
    document.getElementById('addToFavorites').addEventListener('click', () => {
        const id = parseInt(document.getElementById('addToFavorites').dataset.instrumentId);
        toggleFavorite(id);
    });
    
    document.getElementById('addToCompare').addEventListener('click', () => {
        const id = parseInt(document.getElementById('addToCompare').dataset.instrumentId);
        toggleComparison(id);
    });
    
    document.getElementById('clearFavorites').addEventListener('click', clearFavorites);
    document.getElementById('clearComparison').addEventListener('click', clearComparison);
    
    updateFavoritesDisplay();
    updateComparisonDisplay();
}

// Update initialization to use enhanced detail view
const originalShowDetail = showInstrumentDetail;
showInstrumentDetail = showInstrumentDetailEnhanced;

// Comprehensive Music Analysis with Essentia.js
let analysisAudioContext = null;
let analyser = null;
let microStream = null;
let microSource = null;
let microGain = null;
let animationId = null;
let essentia = null;
let essentiaExtractor = null;
let currentAudioElement = null; // Holds HTMLAudioElement when using media element fallback
let currentAudioObjectUrl = null; // Tracks object URL for cleanup
let analysisActive = false; // Flag to control animation loop
let lastFrameTime = 0; // Throttle render updates
let lastHeavyUpdate = 0; // Throttle heavy UI updates (Explorer, instrument/genre canvases)
let aggregateWaveform = null;
let aggregateSpectrum = null;
let aggregateFrames = 0;
let lastAnalysisMetrics = null;

// Ensure AudioContext is running with a guarded resume and recreation fallback
async function ensureAudioContextRunning(existingCtx, label = '') {
    const name = label ? ` ${label}` : '';
    let ctx = existingCtx;

    if (!ctx || ctx.state === 'closed') {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        console.log(`Audio context created${name}`);
    }

    if (ctx.state === 'suspended') {
        console.log(`Resuming audio context${name}...`);
        try {
            await Promise.race([
                ctx.resume(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Audio context resume timeout')), 6000))
            ]);
            console.log(`Audio context resumed${name}`);
        } catch (resumeError) {
            console.warn(`Audio context resume failed${name}, recreating...`, resumeError);
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            try {
                await ctx.resume();
                console.log(`Audio context recreated and resumed${name}`);
            } catch (recreateError) {
                console.error(`Audio context recreation failed${name}:`, recreateError);
                throw recreateError;
            }
        }
    }

    return ctx;
}

// Decode with timeout to avoid hanging on unsupported codecs
async function decodeWithTimeout(arrayBuffer, audioCtx, timeoutMs = 4000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('decodeAudioData timeout'));
        }, timeoutMs);

        audioCtx.decodeAudioData(arrayBuffer).then(buffer => {
            clearTimeout(timer);
            resolve(buffer);
        }).catch(err => {
            clearTimeout(timer);
            reject(err);
        });
    });
}
let spectrogramData = [];
let energyHistory = [];
let pitchHistory = [];
const maxHistoryLength = 200;
let rhythmOnsetHistory = [];
let rhythmLowEnergyHistory = [];
const rhythmHistoryLimit = 240;
const rhythmFps = 30;

// Initialize Essentia
async function initEssentia() {
    if (!essentia) {
        try {
            // Load Essentia from CDN
            essentia = new window.Essentia();
            await essentia.initialize();
            essentiaExtractor = new window.EssentiaExtractor(essentia);
            console.log('Essentia.js initialized successfully');
        } catch (e) {
            console.warn('Essentia.js loading failed, using basic analysis:', e);
            essentia = null;
        }
    }
    return essentia;
}

class ComprehensiveMusicAnalyzer {
    constructor() {
        this.dataArray = null;
        this.frequencyData = null;
        this.waveform = null;
        this.spectrum = null;
    }

    initAnalyzer(audioContext) {
        analysisAudioContext = audioContext;
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 4096; // Higher FFT size for better frequency resolution
        const bufferLength = analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.frequencyData = new Uint8Array(bufferLength);
        return analyser;
    }

    getWaveformData() {
        if (!analyser) return null;
        analyser.getByteTimeDomainData(this.dataArray);
        return this.dataArray;
    }

    getFrequencyData() {
        if (!analyser) return null;
        analyser.getByteFrequencyData(this.frequencyData);
        return this.frequencyData;
    }

    // Advanced Tempo Detection using low-frequency onset detection
    detectTempo(frequencyData) {
        const fps = 30; // analysis frame rate target
        const minBpm = 60;
        const maxBpm = 200;

        // Focus on low frequencies (bass/kick drums) for rhythm: 0-200 Hz range
        const lowFreqEnd = Math.floor(frequencyData.length * 0.05); // ~5% of spectrum
        let lowFreqEnergy = 0;

        for (let i = 0; i < lowFreqEnd; i++) {
            lowFreqEnergy += frequencyData[i];
        }

        if (!this.energyHistory) {
            this.energyHistory = [];
        }
        if (!this.onsetHistory) {
            this.onsetHistory = [];
        }

        this.energyHistory.push(lowFreqEnergy);
        if (this.energyHistory.length > 200) {
            this.energyHistory.shift();
        }

        // Onset strength = positive energy change
        if (this.energyHistory.length > 1) {
            const prev = this.energyHistory[this.energyHistory.length - 2];
            const diff = Math.max(0, lowFreqEnergy - prev);
            this.onsetHistory.push(diff);
            if (this.onsetHistory.length > 200) {
                this.onsetHistory.shift();
            }
        }

        if (this.onsetHistory.length < 60) {
            return this.lastTempo || 120;
        }

        // Normalize onset history
        const maxOnset = Math.max(...this.onsetHistory);
        if (maxOnset === 0) {
            return this.lastTempo || 120;
        }
        const onset = this.onsetHistory.map(val => val / maxOnset);

        // Autocorrelation to find periodicity
        const minLag = Math.max(2, Math.round((fps * 60) / maxBpm));
        const maxLag = Math.min(onset.length - 2, Math.round((fps * 60) / minBpm));
        let bestLag = 0;
        let bestCorr = 0;

        for (let lag = minLag; lag <= maxLag; lag++) {
            let sum = 0;
            for (let i = lag; i < onset.length; i++) {
                sum += onset[i] * onset[i - lag];
            }
            const corr = sum / (onset.length - lag);
            if (corr > bestCorr) {
                bestCorr = corr;
                bestLag = lag;
            }
        }

        if (!bestLag || bestCorr < 0.01) {
            return this.lastTempo || 120;
        }

        const bpm = Math.round((fps * 60) / bestLag);
        const clampedBpm = Math.min(maxBpm, Math.max(minBpm, bpm));

        if (!this.tempoHistory) {
            this.tempoHistory = [];
        }
        this.tempoHistory.push(clampedBpm);
        if (this.tempoHistory.length > 5) {
            this.tempoHistory.shift();
        }
        const sorted = [...this.tempoHistory].sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];

        this.lastTempo = median;
        return median;
    }

    resetRhythmState() {
        this.prevLowFreqEnergy = null;
    }

    calculateLowFrequencyEnergy(frequencyData, lowFreqRatio = 0.05) {
        const lowFreqEnd = Math.max(1, Math.floor(frequencyData.length * lowFreqRatio));
        let lowFreqEnergy = 0;
        for (let i = 0; i < lowFreqEnd; i++) {
            lowFreqEnergy += frequencyData[i];
        }
        return lowFreqEnergy;
    }

    calculateOnsetStrength(lowFreqEnergy) {
        if (this.prevLowFreqEnergy === null || this.prevLowFreqEnergy === undefined) {
            this.prevLowFreqEnergy = lowFreqEnergy;
            return 0;
        }
        const diff = lowFreqEnergy - this.prevLowFreqEnergy;
        this.prevLowFreqEnergy = lowFreqEnergy;
        return Math.max(0, diff);
    }

    // Detect musical key using pitch class distribution with Krumhansl-Schmuckler key-finding algorithm
    detectKey(frequencyData) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const sampleRate = 44100;
        const nyquist = sampleRate / 2;
        const fftSize = 2048; // Standard FFT size
        let pitchClassProfile = new Array(12).fill(0);

        // Major and minor key profiles (Krumhansl-Kessler)
        const majorProfile = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
        const minorProfile = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

        // Distribute energy across pitch classes with better frequency resolution
        for (let i = 1; i < frequencyData.length; i++) {
            // Skip if no energy
            if (frequencyData[i] < 10) continue;
            
            // Calculate frequency for this bin
            const freq = (i * nyquist) / frequencyData.length;
            
            // Focus on musical range (C2 to C7: ~65Hz to 2093Hz)
            if (freq >= 65 && freq <= 2100) {
                // Convert frequency to MIDI note number
                const midiNote = 69 + 12 * Math.log2(freq / 440);
                
                // Get pitch class (0-11)
                const pitchClass = Math.round(midiNote) % 12;
                const normalizedClass = ((pitchClass % 12) + 12) % 12;
                
                // Weight by energy and apply harmonic weighting
                // Higher harmonics contribute less to key perception
                const octave = Math.floor(midiNote / 12);
                const harmonicWeight = 1 / (1 + Math.abs(octave - 5) * 0.3); // Peak around middle C
                
                pitchClassProfile[normalizedClass] += frequencyData[i] * harmonicWeight;
            }
        }

        // Check if we have enough energy to determine key
        const totalEnergy = pitchClassProfile.reduce((a, b) => a + b, 0);
        if (totalEnergy < 100) {
            return this.lastKey || 'C'; // Return cached or default
        }

        // Normalize pitch class profile
        const maxPitch = Math.max(...pitchClassProfile);
        if (maxPitch > 0) {
            pitchClassProfile = pitchClassProfile.map(val => val / maxPitch);
        }

        // Calculate correlation with all major and minor keys
        let bestCorrelation = -Infinity;
        let bestKey = 'C';
        let bestMode = 'major';

        for (let tonic = 0; tonic < 12; tonic++) {
            // Test major key
            let majorCorr = 0;
            for (let i = 0; i < 12; i++) {
                const profileIdx = (i - tonic + 12) % 12;
                majorCorr += pitchClassProfile[i] * majorProfile[profileIdx];
            }
            
            if (majorCorr > bestCorrelation) {
                bestCorrelation = majorCorr;
                bestKey = notes[tonic];
                bestMode = 'major';
            }

            // Test minor key
            let minorCorr = 0;
            for (let i = 0; i < 12; i++) {
                const profileIdx = (i - tonic + 12) % 12;
                minorCorr += pitchClassProfile[i] * minorProfile[profileIdx];
            }
            
            if (minorCorr > bestCorrelation) {
                bestCorrelation = minorCorr;
                bestKey = notes[tonic];
                bestMode = 'minor';
            }
        }

        // Cache result
        const resultKey = bestMode === 'minor' ? `${bestKey}m` : bestKey;
        this.lastKey = resultKey;
        return resultKey;
    }

    // Calculate loudness in LUFS (Loudness Units relative to Full Scale)
    calculateLoudness(waveformData) {
        let rms = 0;
        for (let i = 0; i < waveformData.length; i++) {
            const normalized = (waveformData[i] - 128) / 128;
            rms += normalized * normalized;
        }
        rms = Math.sqrt(rms / waveformData.length);
        
        // Convert to LUFS (simplified)
        const lufs = -0.691 + 10 * Math.log10(Math.max(rms, 0.001));
        return Math.max(-60, Math.min(0, lufs));
    }

    // Get dominant frequency with higher precision
    getDominantFrequency(frequencyData) {
        let maxValue = 0;
        let maxIndex = 0;

        for (let i = 10; i < frequencyData.length; i++) {
            if (frequencyData[i] > maxValue) {
                maxValue = frequencyData[i];
                maxIndex = i;
            }
        }

        const sampleRate = 44100;
        const nyquist = sampleRate / 2;
        const frequency = (maxIndex * nyquist) / frequencyData.length;
        return Math.round(frequency);
    }

    // Calculate overall energy
    calculateEnergy(frequencyData) {
        let energy = 0;
        for (let i = 0; i < frequencyData.length; i++) {
            energy += (frequencyData[i] / 255) ** 2;
        }
        return Math.round((energy / frequencyData.length) * 100);
    }

    // Calculate Zero Crossing Rate (indicator of noisiness)
    calculateZeroCrossingRate(waveformData) {
        let zeroCrossings = 0;
        for (let i = 0; i < waveformData.length - 1; i++) {
            const a = waveformData[i] - 128;
            const b = waveformData[i + 1] - 128;
            if ((a > 0 && b < 0) || (a < 0 && b > 0)) {
                zeroCrossings++;
            }
        }
        return (zeroCrossings / (waveformData.length - 1)).toFixed(4);
    }

    // Calculate Mel-Frequency Cepstral Coefficients (MFCCs) - simplified
    calculateMFCC(frequencyData) {
        // Simplified MFCC calculation using mel-scale bins
        const melBands = 13;
        let mfcc = new Array(melBands).fill(0);

        for (let i = 0; i < frequencyData.length; i++) {
            const melIndex = Math.floor((i / frequencyData.length) * melBands);
            if (melIndex < melBands) {
                mfcc[melIndex] += frequencyData[i];
            }
        }

        // Return average of MFCCs
        const average = mfcc.reduce((a, b) => a + b) / melBands;
        return Math.round(average);
    }

    // Spectral Centroid - center of mass of the spectrum
    calculateSpectralCentroid(frequencyData) {
        let numerator = 0;
        let denominator = 0;

        for (let i = 0; i < frequencyData.length; i++) {
            numerator += i * frequencyData[i];
            denominator += frequencyData[i];
        }

        if (denominator === 0) return 0;

        const sampleRate = 44100;
        const nyquist = sampleRate / 2;
        const centroid = (numerator / denominator) * (nyquist / frequencyData.length);
        return Math.round(centroid);
    }

    // Instrument Detection based on spectral features
    // Calculate Spectral Rolloff (frequency below which 85% of energy is contained)
    calculateSpectralRolloff(frequencyData) {
        let totalEnergy = 0;
        for (let i = 0; i < frequencyData.length; i++) {
            totalEnergy += frequencyData[i];
        }

        let cumulativeEnergy = 0;
        const threshold = totalEnergy * 0.85;

        for (let i = 0; i < frequencyData.length; i++) {
            cumulativeEnergy += frequencyData[i];
            if (cumulativeEnergy >= threshold) {
                return i / frequencyData.length;
            }
        }
        return 1.0;
    }

    // Calculate Spectral Flux (rate of change in spectrum)
    calculateSpectralFlux(frequencyData) {
        if (!this.previousSpectrum) {
            this.previousSpectrum = [...frequencyData];
            return 0;
        }

        let flux = 0;
        for (let i = 0; i < frequencyData.length; i++) {
            const diff = frequencyData[i] - this.previousSpectrum[i];
            flux += Math.max(0, diff);
        }

        this.previousSpectrum = [...frequencyData];
        return flux / frequencyData.length / 255;
    }
}

// Simple axes helper for canvases
function drawAxes(ctx, width, height, xLabel, yLabel) {
    const xAxisY = height - 20;
    const yAxisX = 40;
    const topPad = 10;
    const rightPad = 10;
    const tickCount = 5;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;

    // X axis (bottom)
    ctx.beginPath();
    ctx.moveTo(yAxisX, xAxisY);
    ctx.lineTo(width - rightPad, xAxisY);
    ctx.stroke();

    // Y axis (left)
    ctx.beginPath();
    ctx.moveTo(yAxisX, xAxisY);
    ctx.lineTo(yAxisX, topPad);
    ctx.stroke();

    // Grid ticks
    ctx.font = '10px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.textAlign = 'center';
    const usableWidth = width - yAxisX - rightPad;
    const usableHeight = xAxisY - topPad;

    for (let i = 0; i <= tickCount; i++) {
        const t = i / tickCount;
        // X ticks and labels
        const x = yAxisX + usableWidth * t;
        ctx.beginPath();
        ctx.moveTo(x, xAxisY);
        ctx.lineTo(x, xAxisY - 4);
        ctx.stroke();
        ctx.fillText(t.toFixed(2), x, xAxisY + 12);

        // Y ticks and labels (normalized 1→0)
        const y = xAxisY - usableHeight * t;
        ctx.beginPath();
        ctx.moveTo(yAxisX, y);
        ctx.lineTo(yAxisX + 4, y);
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.fillText((1 - t).toFixed(2), yAxisX - 6, y + 3);
        ctx.textAlign = 'center';

        // Light grid lines
        if (i > 0 && i < tickCount) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.beginPath();
            ctx.moveTo(x, topPad);
            ctx.lineTo(x, xAxisY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(yAxisX, y);
            ctx.lineTo(width - rightPad, y);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        }
    }

    // X label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '11px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(xLabel, width - rightPad, height - 6);

    // Y label (rotated)
    ctx.save();
    ctx.translate(12, 16);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'right';
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
}

const musicAnalyzer = new ComprehensiveMusicAnalyzer();

function drawWaveform(canvas, dataArray) {
    const ctx = canvas.getContext('2d');
    const bufferLength = dataArray.length;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    drawAxes(ctx, width, height, 'Time', 'Amplitude');

    // Draw center line
    ctx.strokeStyle = 'rgba(44, 95, 45, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw waveform
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2c5f2d';
    ctx.beginPath();

    const sliceWidth = width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw peaks
    ctx.fillStyle = 'rgba(253, 197, 0, 0.3)';
    for (let i = 0; i < Math.min(bufferLength, 100); i++) {
        const v = dataArray[i] / 128.0;
        const x = (i / bufferLength) * width;
        const y = (v * height) / 2;
        ctx.fillRect(x, y - 2, 2, 4);
    }
}

function drawFrequencySpectrum(canvas, frequencyData) {
    const ctx = canvas.getContext('2d');
    const bufferLength = frequencyData.length;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    drawAxes(ctx, width, height, 'Frequency bins', 'Magnitude');

    // Draw frequency bars with smooth gradient
    const barWidth = Math.max(1, (width / bufferLength) * 2.5);
    let x = 0;

    for (let i = 0; i < bufferLength; i += 2) {
        const barHeight = (frequencyData[i] / 255) * height;

        // Dynamic color based on frequency and intensity
        const hue = (i / bufferLength) * 360;
        const saturation = Math.min(100, (frequencyData[i] / 255) * 150);
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, 50%)`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth;
    }

    // Draw envelope
    ctx.strokeStyle = 'rgba(253, 197, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < bufferLength; i += 10) {
        const barHeight = (frequencyData[i] / 255) * height;
        const xPos = (i / bufferLength) * width;
        if (i === 0) {
            ctx.moveTo(xPos, height - barHeight);
        } else {
            ctx.lineTo(xPos, height - barHeight);
        }
    }
    ctx.stroke();
}

function drawSpectrogram(canvas, frequencyData) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Store frequency data history
    spectrogramData.push([...frequencyData]);
    if (spectrogramData.length > maxHistoryLength) {
        spectrogramData.shift();
    }

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    drawAxes(ctx, width, height, 'Time', 'Frequency');

    // Draw spectrogram
    const sliceWidth = width / spectrogramData.length;
    const binHeight = height / 256;

    for (let t = 0; t < spectrogramData.length; t++) {
        const slice = spectrogramData[t];
        for (let i = 0; i < Math.min(slice.length, 256); i++) {
            const value = slice[i] / 255;
            const hue = 240 - (value * 240); // Blue to red
            ctx.fillStyle = `hsl(${hue}, 100%, ${50 * value}%)`;
            ctx.fillRect(t * sliceWidth, height - (i * binHeight), sliceWidth, binHeight);
        }
    }

    // Draw time labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '12px Arial';
    ctx.fillText('Time →', width - 60, height - 10);
    ctx.fillText('Freq ↑', 10, 20);
}

function drawEnergyEnvelope(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    drawAxes(ctx, width, height, 'Time', 'Energy');

    if (energyHistory.length < 2) return;

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Draw energy line
    ctx.strokeStyle = '#2c5f2d';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const sliceWidth = width / energyHistory.length;
    for (let i = 0; i < energyHistory.length; i++) {
        const x = i * sliceWidth;
        const y = height - (energyHistory[i] * height);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = 'rgba(44, 95, 45, 0.3)';
    ctx.fill();

    // Labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px Arial';
    ctx.fillText('Energy Level', 10, 20);
    ctx.fillText('Time →', width - 60, height - 10);
}

function drawPitchDistribution(canvas, frequencyData) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    drawAxes(ctx, width, height, 'Frequency bins', 'Pitch energy');

    // Calculate pitch class distribution
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let pitchEnergy = new Array(12).fill(0);

    const sampleRate = 44100;
    const nyquist = sampleRate / 2;

    for (let i = 0; i < frequencyData.length; i++) {
        const freq = (i * nyquist) / frequencyData.length;
        if (freq > 0) {
            const semitone = 12 * Math.log2(freq / 440) + 69;
            const noteIndex = ((Math.round(semitone) % 12) + 12) % 12;
            pitchEnergy[noteIndex] += frequencyData[i];
        }
    }

    // Normalize
    const maxEnergy = Math.max(...pitchEnergy, 1);
    pitchEnergy = pitchEnergy.map(e => e / maxEnergy);

    // Draw bars
    const barWidth = width / 12;
    for (let i = 0; i < 12; i++) {
        const barHeight = pitchEnergy[i] * (height - 40);
        const x = i * barWidth;
        
        // Color gradient
        const hue = (i / 12) * 360;
        ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
        ctx.fillRect(x + 5, height - barHeight - 30, barWidth - 10, barHeight);

        // Note labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(notes[i], x + barWidth / 2, height - 10);
    }

    // Title
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Pitch Class Distribution', 10, 20);
}

function normalizeSeries(series) {
    if (!series.length) return [];
    const maxVal = Math.max(...series);
    if (maxVal === 0) return series.map(() => 0);
    return series.map(val => val / maxVal);
}

function computeOnsetFromEnergySeries(energySeries) {
    if (!energySeries || energySeries.length < 2) return [];
    const onset = [];
    for (let i = 1; i < energySeries.length; i++) {
        onset.push(Math.max(0, energySeries[i] - energySeries[i - 1]));
    }
    return onset;
}

function drawOnsetEnvelope(canvas, onsetHistory) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    drawAxes(ctx, width, height, 'Time', 'Onset');

    if (!onsetHistory.length) return;

    ctx.strokeStyle = '#fdc500';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const sliceWidth = width / onsetHistory.length;
    for (let i = 0; i < onsetHistory.length; i++) {
        const x = i * sliceWidth;
        const y = height - (onsetHistory[i] * (height - 30)) - 10;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

function calculatePulseClarity(onsetHistory) {
    if (onsetHistory.length < 30) return null;
    const normalized = normalizeSeries(onsetHistory);
    const maxLag = Math.min(60, normalized.length - 2);
    let best = 0;
    let total = 0;
    let count = 0;

    for (let lag = 2; lag <= maxLag; lag++) {
        let autoc = 0;
        for (let i = 0; i < normalized.length - lag; i++) {
            autoc += normalized[i] * normalized[i + lag];
        }
        autoc /= (normalized.length - lag);
        best = Math.max(best, autoc);
        total += autoc;
        count++;
    }

    if (count === 0) return null;
    const avg = total / count;
    if (avg === 0) return null;
    const clarity = Math.min(1, (best / avg) / 4);
    return clarity;
}

function estimateMeter(onsetHistory, tempo) {
    if (!tempo || onsetHistory.length < 30) return '--';
    const framesPerBeat = Math.max(2, Math.round((60 / tempo) * rhythmFps));
    const candidates = [
        { beats: 3, label: '3/4' },
        { beats: 4, label: '4/4' },
        { beats: 6, label: '6/8' }
    ];

    let bestScore = -Infinity;
    let bestLabel = '--';

    candidates.forEach(candidate => {
        const barFrames = candidate.beats * framesPerBeat;
        if (onsetHistory.length < barFrames * 2) return;

        const start = Math.max(0, onsetHistory.length - barFrames * 2);
        const beatEnergies = new Array(candidate.beats).fill(0);
        const beatCounts = new Array(candidate.beats).fill(0);

        for (let i = start; i < onsetHistory.length; i++) {
            const posInBar = (i - start) % barFrames;
            const beatIndex = Math.min(candidate.beats - 1, Math.floor(posInBar / framesPerBeat));
            beatEnergies[beatIndex] += onsetHistory[i];
            beatCounts[beatIndex] += 1;
        }

        const averaged = beatEnergies.map((sum, idx) => sum / Math.max(1, beatCounts[idx]));
        const mean = averaged.reduce((a, b) => a + b, 0) / averaged.length;
        const variance = averaged.reduce((a, b) => a + (b - mean) ** 2, 0) / averaged.length;
        const score = mean > 0 ? (variance / mean) : 0;

        if (score > bestScore) {
            bestScore = score;
            bestLabel = candidate.label;
        }
    });

    return bestLabel;
}

function calculateSwingRatio(onsetHistory, tempo) {
    if (!tempo || onsetHistory.length < 30) return null;
    const framesPerBeat = Math.max(2, Math.round((60 / tempo) * rhythmFps));
    const mean = onsetHistory.reduce((a, b) => a + b, 0) / onsetHistory.length;
    const variance = onsetHistory.reduce((a, b) => a + (b - mean) ** 2, 0) / onsetHistory.length;
    const threshold = mean + Math.sqrt(variance) * 0.6;

    const peaks = [];
    for (let i = 1; i < onsetHistory.length - 1; i++) {
        if (onsetHistory[i] > threshold && onsetHistory[i] > onsetHistory[i - 1] && onsetHistory[i] >= onsetHistory[i + 1]) {
            peaks.push(i);
        }
    }

    if (peaks.length < 6) return null;

    const intervals = [];
    for (let i = 1; i < peaks.length; i++) {
        const interval = peaks[i] - peaks[i - 1];
        if (interval > framesPerBeat * 0.25 && interval < framesPerBeat * 1.75) {
            intervals.push(interval);
        }
    }

    if (intervals.length < 4) return null;

    const ratios = [];
    for (let i = 0; i < intervals.length - 1; i += 2) {
        const a = intervals[i];
        const b = intervals[i + 1];
        if (!b) break;
        const short = Math.min(a, b);
        const long = Math.max(a, b);
        ratios.push(long / Math.max(1, short));
    }

    if (!ratios.length) return null;
    const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    return Math.min(3, Math.max(1, avgRatio));
}

function calculateSyncopationIndex(onsetHistory, tempo) {
    if (!tempo || onsetHistory.length < 36) return null;
    const framesPerBeat = Math.max(2, Math.round((60 / tempo) * rhythmFps));
    const framesPerStep = framesPerBeat / 4;
    if (framesPerStep < 1) return null;

    const barFrames = Math.round(framesPerStep * 16);
    if (onsetHistory.length < barFrames) return null;

    const start = onsetHistory.length - barFrames;
    const grid = new Array(16).fill(0);
    for (let step = 0; step < 16; step++) {
        const index = Math.round(start + step * framesPerStep);
        grid[step] = onsetHistory[Math.min(onsetHistory.length - 1, Math.max(0, index))] || 0;
    }

    const strongSteps = [0, 4, 8, 12];
    let strongEnergy = 0;
    let weakEnergy = 0;
    grid.forEach((val, idx) => {
        if (strongSteps.includes(idx)) {
            strongEnergy += val;
        } else {
            weakEnergy += val;
        }
    });

    const total = strongEnergy + weakEnergy;
    if (total === 0) return null;
    return weakEnergy / total;
}

function resetRhythmicAnalysisState(resetMetrics = true) {
    rhythmOnsetHistory = [];
    rhythmLowEnergyHistory = [];
    if (musicAnalyzer) {
        musicAnalyzer.resetRhythmState();
    }

    const canvas = document.getElementById('rhythmAnalysisCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (resetMetrics) {
        const meterEl = document.getElementById('meterMetric');
        const pulseEl = document.getElementById('pulseClarityMetric');
        const swingEl = document.getElementById('swingMetric');
        const syncEl = document.getElementById('syncopationMetric');
        if (meterEl) meterEl.textContent = '--';
        if (pulseEl) pulseEl.textContent = '--';
        if (swingEl) swingEl.textContent = '--';
        if (syncEl) syncEl.textContent = '--';
    }
}

function calculateWaveformEnergy(waveformData) {
    if (!waveformData || !waveformData.length) return 0;
    let sum = 0;
    for (let i = 0; i < waveformData.length; i++) {
        const centered = (waveformData[i] - 128) / 128;
        sum += centered * centered;
    }
    return Math.sqrt(sum / waveformData.length);
}

function updateRhythmicAnalysis(frequencyData, waveformData, tempo, doHeavyUpdates) {
    let lowEnergy = musicAnalyzer.calculateLowFrequencyEnergy(frequencyData);
    if (!Number.isFinite(lowEnergy) || lowEnergy <= 0) {
        lowEnergy = calculateWaveformEnergy(waveformData) * 255;
    }
    const onset = musicAnalyzer.calculateOnsetStrength(lowEnergy);
    rhythmLowEnergyHistory.push(lowEnergy);
    rhythmOnsetHistory.push(onset);

    if (rhythmLowEnergyHistory.length > rhythmHistoryLimit) {
        rhythmLowEnergyHistory.shift();
    }
    if (rhythmOnsetHistory.length > rhythmHistoryLimit) {
        rhythmOnsetHistory.shift();
    }

    let normalizedOnsets = normalizeSeries(rhythmOnsetHistory);
    const onsetMax = normalizedOnsets.length ? Math.max(...normalizedOnsets) : 0;
    if (onsetMax < 0.05 && energyHistory.length > 5) {
        const fallbackOnset = computeOnsetFromEnergySeries(energyHistory);
        normalizedOnsets = normalizeSeries(fallbackOnset);
    }
    const rhythmCanvas = document.getElementById('rhythmAnalysisCanvas');
    if (rhythmCanvas) {
        drawOnsetEnvelope(rhythmCanvas, normalizedOnsets);
    }

    if (!doHeavyUpdates) return;

    if (normalizedOnsets.length < 20) {
        const meterEl = document.getElementById('meterMetric');
        const pulseEl = document.getElementById('pulseClarityMetric');
        const swingEl = document.getElementById('swingMetric');
        const syncEl = document.getElementById('syncopationMetric');
        if (meterEl) meterEl.textContent = 'Analyzing...';
        if (pulseEl) pulseEl.textContent = 'Analyzing...';
        if (swingEl) swingEl.textContent = 'Analyzing...';
        if (syncEl) syncEl.textContent = 'Analyzing...';
        return;
    }

    const meter = estimateMeter(normalizedOnsets, tempo);
    const pulseClarity = calculatePulseClarity(normalizedOnsets);
    const swingRatio = calculateSwingRatio(normalizedOnsets, tempo);
    const syncopation = calculateSyncopationIndex(normalizedOnsets, tempo);

    const meterEl = document.getElementById('meterMetric');
    const pulseEl = document.getElementById('pulseClarityMetric');
    const swingEl = document.getElementById('swingMetric');
    const syncEl = document.getElementById('syncopationMetric');

    if (meterEl) meterEl.textContent = meter || '--';
    if (pulseEl) pulseEl.textContent = Number.isFinite(pulseClarity) ? `${Math.round(pulseClarity * 100)}%` : '--';
    if (swingEl) swingEl.textContent = Number.isFinite(swingRatio) ? `${swingRatio.toFixed(2)}:1` : '--';
    if (syncEl) syncEl.textContent = Number.isFinite(syncopation) ? `${Math.round(syncopation * 100)}%` : '--';
}

function updateAnalysisDisplay(timestamp) {
    // Only loop if analysis is active
    if (!analysisActive) {
        return;
    }

    // Throttle to ~30fps
    if (lastFrameTime && timestamp && (timestamp - lastFrameTime) < 33) {
        animationId = requestAnimationFrame(updateAnalysisDisplay);
        return;
    }
    const now = timestamp || performance.now();
    lastFrameTime = now;

    // Always schedule next frame to avoid stalling the loop
    animationId = requestAnimationFrame(updateAnalysisDisplay);

    if (!analyser) {
        console.warn('Analyser not initialized');
        return;
    }

    const waveformData = musicAnalyzer.getWaveformData();
    const frequencyData = musicAnalyzer.getFrequencyData();

    if (!waveformData || !frequencyData) {
        console.warn('Waveform or frequency data unavailable');
        return;
    }

    // Draw visualizations
    const waveformCanvas = document.getElementById('waveformCanvas');
    const frequencyCanvas = document.getElementById('frequencyCanvas');
    const spectrogramCanvas = document.getElementById('spectrogramCanvas');
    const energyCanvas = document.getElementById('energyCanvas');
    const pitchCanvas = document.getElementById('pitchCanvas');
    const doHeavyUpdates = !lastHeavyUpdate || (now - lastHeavyUpdate) > 500; // Limit heavy DOM work

    if (waveformCanvas) drawWaveform(waveformCanvas, waveformData);
    if (frequencyCanvas) drawFrequencySpectrum(frequencyCanvas, frequencyData);
    if (spectrogramCanvas) drawSpectrogram(spectrogramCanvas, frequencyData);
    if (pitchCanvas) drawPitchDistribution(pitchCanvas, frequencyData);

    // Calculate and store energy for envelope
    const energy = musicAnalyzer.calculateEnergy(frequencyData) / 100;
    energyHistory.push(energy);
    if (energyHistory.length > maxHistoryLength) {
        energyHistory.shift();
    }
    if (energyCanvas) drawEnergyEnvelope(energyCanvas);

    // Calculate comprehensive metrics
    const tempo = musicAnalyzer.detectTempo(frequencyData);
    const key = musicAnalyzer.detectKey(frequencyData);
    const loudness = musicAnalyzer.calculateLoudness(waveformData);
    const dominantFreq = musicAnalyzer.getDominantFrequency(frequencyData);
    const energyPercent = musicAnalyzer.calculateEnergy(frequencyData);
    const zcr = musicAnalyzer.calculateZeroCrossingRate(waveformData);
    const mfcc = musicAnalyzer.calculateMFCC(frequencyData);
    const spectralCentroid = musicAnalyzer.calculateSpectralCentroid(frequencyData);

    lastAnalysisMetrics = {
        tempo,
        key,
        loudness,
        dominantFreq,
        energyPercent,
        zcr,
        mfcc,
        spectralCentroid
    };

    updateRhythmicAnalysis(frequencyData, waveformData, tempo, doHeavyUpdates);

    // Accumulate for aggregate views
    if (!aggregateWaveform) {
        aggregateWaveform = new Float32Array(waveformData.length);
    }
    if (!aggregateSpectrum) {
        aggregateSpectrum = new Float32Array(frequencyData.length);
    }
    for (let i = 0; i < waveformData.length; i++) {
        aggregateWaveform[i] += waveformData[i];
    }
    for (let i = 0; i < frequencyData.length; i++) {
        aggregateSpectrum[i] += frequencyData[i];
    }
    aggregateFrames += 1;

    // Update metric displays
    const tempoEl = document.getElementById('tempoMetric');
    if (tempoEl) tempoEl.textContent = tempo > 0 ? tempo + ' BPM' : '--';
    
    const keyEl = document.getElementById('keyMetric');
    if (keyEl) keyEl.textContent = key || '--';
    
    const loudnessEl = document.getElementById('loudnessMetric');
    if (loudnessEl) loudnessEl.textContent = loudness.toFixed(1) + ' LUFS';
    
    const frequencyEl = document.getElementById('frequencyMetric');
    if (frequencyEl) frequencyEl.textContent = dominantFreq + ' Hz';
    
    const energyEl = document.getElementById('energyMetric');
    if (energyEl) energyEl.textContent = energyPercent + '%';
    
    const zcrEl = document.getElementById('zcrMetric');
    if (zcrEl) zcrEl.textContent = zcr;
    
    const mfccEl = document.getElementById('mfccMetric');
    if (mfccEl) mfccEl.textContent = mfcc;

    animationId = requestAnimationFrame(updateAnalysisDisplay);
}

// Download canvas as PNG image
function downloadCanvasAsImage(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        alert('Canvas not found');
        return;
    }

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename + '_' + new Date().toISOString().slice(0, 10) + '.png';
    link.click();
}

function setupMusicAnalysis() {
    // Initialize Essentia if available
    initEssentia();

    const uploadBtn = document.getElementById('uploadAudioBtn');
    const fileInput = document.getElementById('audioFileInput');
    const stopAudioBtn = document.getElementById('stopAudioBtn');
    const micBtn = document.getElementById('microphoneBtn');
    const stopMicBtn = document.getElementById('stopMicBtn');
    const analysisStatus = document.getElementById('analysisStatus');
    const downloadWaveformBtn = document.getElementById('downloadWaveformBtn');
    const downloadSpectrumBtn = document.getElementById('downloadSpectrumBtn');

    // Check if elements exist
    if (!uploadBtn || !fileInput || !micBtn || !stopMicBtn || !stopAudioBtn) {
        console.error('Music analysis elements not found in DOM');
        return;
    }

    if (analysisStatus) {
        analysisStatus.textContent = 'Ready for upload.';
    }

    // Download button listeners
    if (downloadWaveformBtn) {
        downloadWaveformBtn.addEventListener('click', () => {
            downloadCanvasAsImage('waveformCanvas', 'waveform');
            console.log('Waveform downloaded');
        });
    }

    if (downloadSpectrumBtn) {
        downloadSpectrumBtn.addEventListener('click', () => {
            downloadCanvasAsImage('frequencyCanvas', 'frequency-spectrum');
            console.log('Frequency spectrum downloaded');
        });
    }

    const downloadSpectrogramBtn = document.getElementById('downloadSpectrogramBtn');
    const downloadEnergyBtn = document.getElementById('downloadEnergyBtn');
    const downloadPitchBtn = document.getElementById('downloadPitchBtn');
    const downloadRhythmBtn = document.getElementById('downloadRhythmBtn');

    if (downloadSpectrogramBtn) {
        downloadSpectrogramBtn.addEventListener('click', () => {
            downloadCanvasAsImage('spectrogramCanvas', 'spectrogram');
            console.log('Spectrogram downloaded');
        });
    }

    if (downloadEnergyBtn) {
        downloadEnergyBtn.addEventListener('click', () => {
            downloadCanvasAsImage('energyCanvas', 'energy-envelope');
            console.log('Energy envelope downloaded');
        });
    }

    if (downloadPitchBtn) {
        downloadPitchBtn.addEventListener('click', () => {
            downloadCanvasAsImage('pitchCanvas', 'pitch-distribution');
            console.log('Pitch distribution downloaded');
        });
    }

    if (downloadRhythmBtn) {
        downloadRhythmBtn.addEventListener('click', () => {
            downloadCanvasAsImage('rhythmAnalysisCanvas', 'rhythm-onset');
            console.log('Rhythm onset envelope downloaded');
        });
    }

    // Store current audio source for stopping
    let currentAudioSource = null;

    // File upload
    uploadBtn.addEventListener('click', () => {
        console.log('Upload button clicked');
        fileInput.value = ''; // Reset file input to allow re-uploading same file
        fileInput.click();
    });

    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log('No file selected');
            return;
        }

        if (analysisStatus) {
            analysisStatus.textContent = `Loading ${file.name}...`;
        }

        resetRhythmicAnalysisState();

        console.log('File selected:', file.name, file.type, file.size);

        // Check if file is audio
        if (!file.type.startsWith('audio/')) {
            alert('Please select an audio file');
            if (analysisStatus) {
                analysisStatus.textContent = 'Unsupported file type.';
            }
            return;
        }

        // Check file size (warn if > 10MB)
        if (file.size > 10 * 1024 * 1024) {
            if (!confirm(`File is large (${(file.size / 1024 / 1024).toFixed(1)}MB). This may take time to load. Continue?`)) {
                return;
            }
        }

        // Ensure button remains usable; do not disable to avoid stuck states
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Loading...';
        uploadBtn.style.opacity = '0.6';

        let fallbackAttempted = false;

        const playViaMediaElement = async (fileObj) => {
            console.log('Falling back to media element playback');
            aggregateWaveform = null;
            aggregateSpectrum = null;
            aggregateFrames = 0;
            resetRhythmicAnalysisState(false);

            fallbackAttempted = true;

            // Ensure audio context exists and running
            try {
                analysisAudioContext = await ensureAudioContextRunning(analysisAudioContext, '(fallback)');
            } catch (resumeErr) {
                console.error('Fallback audio context failed:', resumeErr);
                alert('Audio could not start (context error). Try another file or refresh.');
                if (analysisStatus) {
                    analysisStatus.textContent = 'Audio context failed to start.';
                }
                throw resumeErr;
            }

            if (currentAudioObjectUrl) {
                URL.revokeObjectURL(currentAudioObjectUrl);
                currentAudioObjectUrl = null;
            }

            const objectUrl = URL.createObjectURL(fileObj);
            currentAudioObjectUrl = objectUrl;

            const audioElement = new Audio(objectUrl);
            audioElement.crossOrigin = 'anonymous';
            currentAudioElement = audioElement;

            audioElement.addEventListener('error', () => {
                const code = audioElement.error?.code || 'unknown';
                console.error('Audio element error code:', code);
                if (analysisStatus) {
                    analysisStatus.textContent = 'Audio element error. The file may be unsupported.';
                }
            });

            const source = analysisAudioContext.createMediaElementSource(audioElement);
            currentAudioSource = source;

            musicAnalyzer.initAnalyzer(analysisAudioContext);
            source.connect(analyser);
            analyser.connect(analysisAudioContext.destination);

            audioElement.addEventListener('loadedmetadata', () => {
                if (!isNaN(audioElement.duration)) {
                    document.getElementById('durationMetric').textContent = audioElement.duration.toFixed(2) + 's';
                }
            });

            audioElement.addEventListener('ended', () => {
                if (animationId) cancelAnimationFrame(animationId);
                uploadBtn.style.display = 'inline-block';
                stopAudioBtn.style.display = 'none';
                currentAudioSource = null;
                currentAudioElement = null;
                analysisActive = false;
                lastFrameTime = 0;
                lastHeavyUpdate = 0;
                renderAggregateVisuals();
                if (currentAudioObjectUrl) {
                    URL.revokeObjectURL(currentAudioObjectUrl);
                    currentAudioObjectUrl = null;
                }
                console.log('Audio playback completed (fallback)');
            });

            try {
                await audioElement.play();
                uploadBtn.style.display = 'none';
                stopAudioBtn.style.display = 'inline-block';
                analysisActive = true;
                updateAnalysisDisplay();
                if (analysisStatus) {
                    analysisStatus.textContent = 'Playing (media element fallback).';
                }
                console.log('Audio file playing via media element, analysis started');
            } catch (playError) {
                console.error('Media element playback failed:', playError);
                alert('Playback failed: ' + (playError.message || playError));
                if (analysisStatus) {
                    analysisStatus.textContent = `Playback failed: ${playError.message || playError}`;
                }
                uploadBtn.style.display = 'inline-block';
                stopAudioBtn.style.display = 'none';
                analysisActive = false;
            }
        };

        try {
            console.log('Reading file data...');
            const arrayBuffer = await Promise.race([
                file.arrayBuffer(),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('File read timeout')), 10000)
                )
            ]);
            console.log('File data read, size:', arrayBuffer.byteLength);
            aggregateWaveform = null;
            aggregateSpectrum = null;
            aggregateFrames = 0;
            
            // Ensure audio context exists and is running
            try {
                analysisAudioContext = await ensureAudioContextRunning(analysisAudioContext, '(main)');
            } catch (ctxErr) {
                console.warn('AudioContext failed, using fallback media element:', ctxErr);
                try {
                    await playViaMediaElement(file);
                } catch (fbCtxErr) {
                    console.error('Fallback also failed to start context:', fbCtxErr);
                }
                return;
            }

            console.log('Audio context state:', analysisAudioContext.state);
            console.log('Decoding audio data...');
            let audioBuffer = null;
            try {
                audioBuffer = await decodeWithTimeout(arrayBuffer, analysisAudioContext, 6000);
                console.log('Audio decoded successfully, duration:', audioBuffer.duration);
            } catch (decodeError) {
                console.warn('decodeAudioData failed or timed out, using fallback media element:', decodeError);
                if (analysisStatus) {
                    analysisStatus.textContent = 'Decode failed. Switching to fallback playback...';
                }
                await playViaMediaElement(file);
                return;
            }

            // Display duration
            const duration = audioBuffer.duration;
            document.getElementById('durationMetric').textContent = duration.toFixed(2) + 's';

            // Create audio source and start playback
            const source = analysisAudioContext.createBufferSource();
            source.buffer = audioBuffer;
            currentAudioSource = source;
            currentAudioElement = null;

            // Create gain node for volume control
            const gainNode = analysisAudioContext.createGain();
            gainNode.gain.value = 1.0; // Full volume

            // Initialize analyzer
            musicAnalyzer.initAnalyzer(analysisAudioContext);

            // Connect audio graph properly: source -> analyser -> gainNode -> destination
            // This ensures analyser is in the signal chain and receives audio data
            source.connect(analyser);
            analyser.connect(gainNode);
            gainNode.connect(analysisAudioContext.destination);

            console.log('Starting audio playback...');
            try {
                source.start(0);
            } catch (startError) {
                console.error('source.start() failed:', startError);
                throw startError;
            }
            uploadBtn.style.display = 'none';
            stopAudioBtn.style.display = 'inline-block';
            analysisActive = true;
            updateAnalysisDisplay();
            if (analysisStatus) {
                analysisStatus.textContent = 'Playing (decoded buffer).';
            }

            console.log('Audio file loaded and playing, analysis started');

            // Stop animation when audio ends
            source.onended = () => {
                if (animationId) cancelAnimationFrame(animationId);
                uploadBtn.style.display = 'inline-block';
                stopAudioBtn.style.display = 'none';
                currentAudioSource = null;
                analysisActive = false;
                lastFrameTime = 0;
                lastHeavyUpdate = 0;
                renderAggregateVisuals();
            };
        } catch (error) {
            console.error('Error loading audio file:', error);
            uploadBtn.style.display = 'inline-block';
            stopAudioBtn.style.display = 'none';
            analysisActive = false;
            lastFrameTime = 0;
            lastHeavyUpdate = 0;
            if (analysisStatus) {
                analysisStatus.textContent = `Upload failed: ${error.message || error}`;
            }

            if (!fallbackAttempted) {
                try {
                    await playViaMediaElement(file);
                    return;
                } catch (fbErr) {
                    console.error('Fallback playback also failed:', fbErr);
                }
            }

            let errorMsg = 'Error loading audio file:\n\n';
            if (error.message.includes('timeout')) {
                errorMsg += 'File took too long to load. Try a smaller file or different format.';
            } else if (error.message.includes('decode')) {
                errorMsg += 'File format not supported. Try MP3, WAV, or OGG format.';
            } else if (error.name === 'NotSupportedError') {
                errorMsg += 'This audio format is not supported by your browser. Try MP3 or WAV.';
            } else {
                errorMsg += error.message + '\n\nSupported formats: MP3, WAV, OGG';
            }

            errorMsg += '\n\nTip: Try a smaller file (< 5MB) or convert to MP3 format.';
            alert(errorMsg);
        } finally {
            uploadBtn.textContent = 'Upload Audio File';
            uploadBtn.style.opacity = '1';
        }
    });

    // Stop audio playback
    stopAudioBtn.addEventListener('click', () => {
        if (currentAudioElement) {
            currentAudioElement.pause();
            currentAudioElement.currentTime = 0;
            currentAudioElement.src = '';
            currentAudioElement = null;
        }

        if (currentAudioSource) {
            try {
                if (typeof currentAudioSource.stop === 'function') {
                    currentAudioSource.stop(0);
                }
            } catch (e) {
                console.log('Audio already stopped');
            }
            currentAudioSource = null;
        }

        if (currentAudioObjectUrl) {
            URL.revokeObjectURL(currentAudioObjectUrl);
            currentAudioObjectUrl = null;
        }

        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        uploadBtn.style.display = 'inline-block';
        stopAudioBtn.style.display = 'none';
        analysisActive = false;
        lastFrameTime = 0;
        lastHeavyUpdate = 0;
        renderAggregateVisuals();

        console.log('Audio playback stopped - visualizations preserved');
        if (analysisStatus) {
            analysisStatus.textContent = 'Stopped.';
        }
    });

    // Microphone input
    micBtn.addEventListener('click', async () => {
        try {
            if (location.protocol === 'file:') {
                const msg = 'Microphone access is blocked on file:// URLs. Please run this page from http://localhost and try again.';
                alert(msg);
                if (analysisStatus) {
                    analysisStatus.textContent = 'Microphone blocked on file://. Use a local server.';
                }
                return;
            }
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                const msg = 'Microphone access is not supported in this browser.';
                alert(msg);
                if (analysisStatus) {
                    analysisStatus.textContent = 'Microphone not supported in this browser.';
                }
                return;
            }
            if (analysisStatus) {
                analysisStatus.textContent = 'Requesting microphone permission...';
            }
            if (navigator.permissions && navigator.permissions.query) {
                try {
                    const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
                    if (permissionStatus.state === 'denied') {
                        const msg = 'Microphone permission is blocked for this site. Please allow microphone access in your browser settings and reload the page.';
                        alert(msg);
                        if (analysisStatus) {
                            analysisStatus.textContent = 'Microphone permission blocked. Allow access and reload.';
                        }
                        return;
                    }
                } catch (permError) {
                    console.log('Permissions API not available for microphone:', permError);
                }
            }
            if (microStream) {
                microStream.getTracks().forEach(track => track.stop());
                microStream = null;
            }
            if (microSource) {
                try {
                    microSource.disconnect();
                } catch (e) {
                    console.log('Microphone source already disconnected');
                }
                microSource = null;
            }
            console.log('Requesting microphone access...');
            microStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('Microphone access granted');

            aggregateWaveform = null;
            aggregateSpectrum = null;
            aggregateFrames = 0;
            resetRhythmicAnalysisState();

            // Create fresh audio context for microphone
            analysisAudioContext = await ensureAudioContextRunning(analysisAudioContext, '(mic)');

            console.log('Audio context state:', analysisAudioContext.state);
            console.log('Creating media stream source...');
            
            const source = analysisAudioContext.createMediaStreamSource(microStream);
            microSource = source;
            console.log('Media stream source created');
            
            musicAnalyzer.initAnalyzer(analysisAudioContext);
            source.connect(analyser);

            // Route through a muted gain node to keep the graph alive without feedback
            if (microGain) {
                try {
                    microGain.disconnect();
                } catch (e) {
                    console.log('Microphone gain already disconnected');
                }
                microGain = null;
            }
            microGain = analysisAudioContext.createGain();
            microGain.gain.value = 0;
            analyser.connect(microGain);
            microGain.connect(analysisAudioContext.destination);
            console.log('Audio nodes connected (muted output)');

            micBtn.style.display = 'none';
            stopMicBtn.style.display = 'inline-block';

            document.getElementById('durationMetric').textContent = 'Live';

            analysisActive = true;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            updateAnalysisDisplay();
            if (analysisStatus) {
                analysisStatus.textContent = 'Microphone active (output muted).';
            }
            console.log('Microphone active and playing');
        } catch (error) {
            console.error('Error accessing microphone:', error);
            let errorMessage = 'Microphone access denied.\n\n';
            
            if (error.name === 'NotAllowedError') {
                errorMessage += 'To enable microphone:\n' +
                    '• Click the lock/info icon in the address bar\n' +
                    '• Allow microphone permissions for this site\n' +
                    '• Refresh the page and try again';
            } else if (error.name === 'NotFoundError') {
                errorMessage += 'No microphone found. Please connect a microphone and try again.';
            } else {
                errorMessage += error.message || 'Unknown error occurred.';
            }
            
            alert(errorMessage);
            if (analysisStatus) {
                analysisStatus.textContent = `Microphone error: ${error.name || 'unknown'}. Check permissions and try again.`;
            }
        }
    });

    stopMicBtn.addEventListener('click', () => {
        if (microStream) {
            microStream.getTracks().forEach(track => track.stop());
            microStream = null;
        }

        if (microSource) {
            try {
                microSource.disconnect();
            } catch (e) {
                console.log('Microphone source already disconnected');
            }
            microSource = null;
        }

        if (microGain) {
            try {
                microGain.disconnect();
            } catch (e) {
                console.log('Microphone gain already disconnected');
            }
            microGain = null;
        }

        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        analysisActive = false;
        lastFrameTime = 0;
        lastHeavyUpdate = 0;
        renderAggregateVisuals();
        renderAggregateVisuals();

        micBtn.style.display = 'inline-block';
        stopMicBtn.style.display = 'none';

        console.log('Microphone stopped - visualizations preserved');

        // Reset metrics
        document.getElementById('tempoMetric').textContent = '--';
        document.getElementById('keyMetric').textContent = '--';
        document.getElementById('loudnessMetric').textContent = '--';
        document.getElementById('frequencyMetric').textContent = '--';
        document.getElementById('energyMetric').textContent = '--';
        document.getElementById('zcrMetric').textContent = '--';
        document.getElementById('mfccMetric').textContent = '--';
        document.getElementById('durationMetric').textContent = '--';
        const meterEl = document.getElementById('meterMetric');
        const pulseEl = document.getElementById('pulseClarityMetric');
        const swingEl = document.getElementById('swingMetric');
        const syncEl = document.getElementById('syncopationMetric');
        if (meterEl) meterEl.textContent = '--';
        if (pulseEl) pulseEl.textContent = '--';
        if (swingEl) swingEl.textContent = '--';
        if (syncEl) syncEl.textContent = '--';
        if (lastAnalysisMetrics) {
            const tempoEl = document.getElementById('tempoMetric');
            if (tempoEl) tempoEl.textContent = lastAnalysisMetrics.tempo > 0 ? lastAnalysisMetrics.tempo + ' BPM' : '--';
            const keyEl = document.getElementById('keyMetric');
            if (keyEl) keyEl.textContent = lastAnalysisMetrics.key || '--';
            const loudnessEl = document.getElementById('loudnessMetric');
            if (loudnessEl) loudnessEl.textContent = Number.isFinite(lastAnalysisMetrics.loudness)
                ? lastAnalysisMetrics.loudness.toFixed(1) + ' LUFS'
                : '--';
            const frequencyEl = document.getElementById('frequencyMetric');
            if (frequencyEl) frequencyEl.textContent = lastAnalysisMetrics.dominantFreq + ' Hz';
            const energyEl = document.getElementById('energyMetric');
            if (energyEl) energyEl.textContent = lastAnalysisMetrics.energyPercent + '%';
            const zcrEl = document.getElementById('zcrMetric');
            if (zcrEl) zcrEl.textContent = lastAnalysisMetrics.zcr;
            const mfccEl = document.getElementById('mfccMetric');
            if (mfccEl) mfccEl.textContent = lastAnalysisMetrics.mfcc;
        }
        if (analysisStatus) {
            analysisStatus.textContent = 'Microphone stopped. Last analysis snapshot shown.';
        }
    });
}

// Console welcome message

// Console welcome message
console.log('%c🎵 Welcome to Ethnomusic Lab GY! 🎵', 'color: #2c5f2d; font-size: 20px; font-weight: bold;');
console.log('%cExplore the rich musical heritage of Guyana and the world!', 'color: #fdc500; font-size: 14px;');
console.log('%cNew Features: Quiz Game, Favorites, Comparison Tool, Audio Synthesis!', 'color: #ce1126; font-size: 12px;');

// Render aggregate snapshots after playback/mic stop
function renderAggregateVisuals() {
    if (!aggregateFrames || aggregateFrames === 0) return;

    const waveformCanvas = document.getElementById('waveformCanvas');
    const frequencyCanvas = document.getElementById('frequencyCanvas');

    if (waveformCanvas && aggregateWaveform) {
        const avgWave = new Float32Array(aggregateWaveform.length);
        for (let i = 0; i < aggregateWaveform.length; i++) {
            avgWave[i] = aggregateWaveform[i] / aggregateFrames;
        }
        drawWaveform(waveformCanvas, avgWave);
        const ctx = waveformCanvas.getContext('2d');
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.fillText('Averaged over ' + aggregateFrames + ' frames', waveformCanvas.width - 180, 18);
    }

    if (frequencyCanvas && aggregateSpectrum) {
        const avgSpec = new Float32Array(aggregateSpectrum.length);
        for (let i = 0; i < aggregateSpectrum.length; i++) {
            avgSpec[i] = aggregateSpectrum[i] / aggregateFrames;
        }
        drawFrequencySpectrum(frequencyCanvas, avgSpec);
        const ctx = frequencyCanvas.getContext('2d');
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.fillText('Averaged over ' + aggregateFrames + ' frames', frequencyCanvas.width - 180, 18);
    }
}

