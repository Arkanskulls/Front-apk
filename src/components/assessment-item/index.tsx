import React from 'react';
import { Image, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { AssessmentAdvisorProps } from '../../interfaces';

const AssessmentItem: React.FC<{assessment: AssessmentAdvisorProps}> = ({assessment}: {assessment: AssessmentAdvisorProps}) => {
    const [defaultRating] = React.useState(assessment.stars);
    const [maxRating] = React.useState([1, 2, 3, 4, 5]);
    
    return (
        <View style={{
            flexDirection: 'row',
        }}>
            <Image source={{uri: assessment.athlete.imageLink}} style={{height: 40, width: 40, borderRadius: 50, marginRight: 10}} />
            <View>
                <Text style={{
                    fontSize: 12,
                    fontFamily: 'Poppins_400Regular',
                    paddingBottom: 5,
                    color: '#989898'
                }}>
                    Avaliado por: {assessment.athlete.name}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    paddingBottom: 5,
                }}>
                    {maxRating.map((item, i) => (
                        <FontAwesome
                            key={'star'+i+assessment.uuid}
                            name={item <= defaultRating ? "star" : "star-o"}
                            size={18}
                            color={'#FA7921'} />
                    ))}
                </View>
                {assessment.comment &&
                    <Text style={{
                        fontSize: 12,
                        fontFamily: 'Poppins_400Regular',
                        width: '72%',
                    }}>
                        {assessment.comment}
                    </Text>
                }
                {assessment.advisorResponseComment &&
                    <>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: 'Poppins_400Regular',
                            paddingBottom: 5,
                            color: '#989898'
                        }}>
                            Resposta da assessoria:
                        </Text>
                        <Text style={{
                        fontSize: 12,
                        fontFamily: 'Poppins_400Regular',
                        width: '72%',
                    }}>
                        {assessment.advisorResponseComment}
                    </Text>
                    </>
                }
            </View>
        </View>
    )
}

export { AssessmentItem }