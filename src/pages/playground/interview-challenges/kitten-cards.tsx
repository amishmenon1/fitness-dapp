const cards: KittenCard[] = [
  {
    name: "Kitten 1",
    breed: "Bengal",
    url: "https://loremflickr.com/320/240",
    description: "This is a cute Bengal kitten.",
    age: "3 months",
  },
  {
    name: "Kitten 2",
    breed: "Siamese",
    url: "https://loremflickr.com/320/240",
    description: "This is an adorable Siamese kitten.",
    age: "2 months",
  },
  {
    name: "Kitten 3",
    breed: "Persian",
    url: "https://loremflickr.com/320/240",
    description: "This is a fluffy Persian kitten.",
    age: "4 months",
  },
  {
    name: "Kitten 4",
    breed: "Maine Coon",
    url: "https://loremflickr.com/320/240",
    description: "This is a playful Maine Coon kitten.",
    age: "5 months",
  },
  {
    name: "Kitten 5",
    breed: "Ragdoll",
    url: "https://loremflickr.com/320/240",
    description: "This is a gentle Ragdoll kitten.",
    age: "3 months",
  },
  {
    name: "Kitten 6",
    breed: "Sphynx",
    url: "https://loremflickr.com/320/240",
    description: "This is a hairless Sphynx kitten.",
    age: "2 months",
  },
  {
    name: "Kitten 7",
    breed: "Scottish Fold",
    url: "https://loremflickr.com/320/240",
    description: "This is an adorable Scottish Fold kitten.",
    age: "4 months",
  },
  {
    name: "Kitten 8",
    breed: "Russian Blue",
    url: "https://loremflickr.com/320/240",
    description: "This is a sleek Russian Blue kitten.",
    age: "5 months",
  },
  {
    name: "Kitten 9",
    breed: "Birman",
    url: "https://loremflickr.com/320/240",
    description: "This is a beautiful Birman kitten.",
    age: "3 months",
  },
  {
    name: "Kitten 10",
    breed: "British Shorthair",
    url: "https://loremflickr.com/320/240",
    description: "This is a chubby British Shorthair kitten.",
    age: "2 months",
  },
];

type KittenCard = {
  name: string;
  breed: string;
  url: string;
  description: string;
  age: string;
};

// type Props = {
//   cards: KittenCard[];
// };

const Card = ({ card }: { card: KittenCard }) => {
  return (
    <div
      className="card"
      style={{
        // height: "33vh",
        // flex: 1,
        // width: "33%",
        backgroundColor: "white",
        border: 1,
        borderColor: "blue",
        padding: "5px",
      }}
    >
      <div className="card-img" style={{}}>
        <img src={card.url} style={{ width: "100%" }} />
      </div>
      <div className="card-details" style={{ color: "black" }}>
        {/* Details */}
        <div
          className="card-headers"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          {/* Headers */}
          <div className="card-title" style={{}}>
            {/* Title */}
            <div style={{ display: "flex", justifyContent: "start" }}>
              <p>{card.name}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <p className="card-subtitle" style={{ color: "gray" }}>
                {/* Subtitle */}
                {card.breed} ∞ {card.age}
              </p>
            </div>
          </div>
        </div>
        <div
          className="card-body"
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          {/* Body */}
          {card.description}
        </div>
      </div>
    </div>
  );
};

const KittenCards = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        // paddingLeft: "30px",
        // paddingRight: "30px",
        columnGap: "5px",
        rowGap: "5px",
        width: "70vw",
      }}
    >
      {cards.map((card, idx) => {
        return idx < 6 && <Card key={idx} card={card} />;
      })}
    </div>
  );

  // const firstCard = cards[0];
  // return (
  //   <div
  //     className="kitten-cards"
  //     style={{
  //       marginTop: "50px",
  //     }}
  //   >
  //     {firstCard && <Card card={firstCard} />}
  //   </div>
  // );
};

export default KittenCards;
