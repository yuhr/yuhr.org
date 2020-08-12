import skillsets from "../../public/skillsets.json"
import StarRatings from "react-star-ratings"
import Block from "components/block"
import Divider from "components/divider"

export const Skillsets = () => {
  return (
    <>
      {Object.entries(skillsets).map(([category, skillset]) => (
        <section key={category}>
          <Block>
            <h2>{category}</h2>
          </Block>
          <dl>
            {Object.entries(skillset).map(([skill, rating]) => (
              <Block key={skill} className="skill">
                <dt>{skill}</dt>
                <dd>
                  <StarRatings
                    rating={rating * 5}
                    numberOfStars={5}
                    name={skill}
                    starDimension="1rem"
                    starSpacing="0"
                  />
                </dd>
              </Block>
            ))}
            <style jsx>{`
              dl {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-around;
                align-items: center;
                margin: 1rem 0.5rem;
                & :global(.skill) {
                  display: inline-block;
                  margin: 0.25rem;
                  & > dt  {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    align-items: center;
                  }
                  & > dd {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    align-items: center;
                    &::before {
                      content: "";
                      display: block;
                      height: 1px;
                      width: 100%;
                      background: #cccccc;
                    }
                  }
                }
              }
            `}</style>
          </dl>
        </section>
      ))}
    </>
  )
}

export default Skillsets