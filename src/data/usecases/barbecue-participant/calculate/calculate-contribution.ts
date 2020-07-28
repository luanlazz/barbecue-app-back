import { calculateContribution } from '@/domain/usecases/barbecue-participant/calculate-contribution'
import { ParticipantModel } from '@/domain/models/participant'
import { BarbecueModel } from '@/domain/models/barbecue'

export class CalculateContribution implements calculateContribution {
  calculate (barbecue: BarbecueModel, participants: ParticipantModel[]): ParticipantModel[] {
    const countDrink = participants.filter(participant => participant.drink)
    const countFood = participants.filter(participant => participant.food)

    const drinkDivide = barbecue.valueTotalDrink / countDrink.length
    const foodDivide = barbecue.valueTotalFood / countFood.length

    const participantsCalculate = participants.map(participant => (
      {
        ...participant,
        value: this.calculateContribution(drinkDivide, foodDivide, participant.drink, participant.food)
      }
    ))

    return participantsCalculate
  }

  calculateContribution (valueDrink: number, valueFood: number, drink: boolean, food: boolean): number {
    const drinkTotal = drink ? valueDrink : 0
    const foodTotal = food ? valueFood : 0
    return drinkTotal + foodTotal
  }
}
