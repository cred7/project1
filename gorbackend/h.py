
class Payement:
    def __init__(self,name):
        self.name = name

class Cash(Payement):
    def pay(self,amount):
        print(f'{self.name} payed {amount} through cash')
class Card(Payement):
    def pay(self,amount):
        print(f'{self.name} payed {amount} through card')
class Mpesa(Payement):
    def pay(self,amount):
        print(f'{self.name} payed {amount} through mpesa')

def procces_payement(payement,amount):
    payement.pay(amount)


name = input("Enter your name :")
amount = input("Enter amount to be paid :")

print('\n choose payement method')
print("1. cash")
print("3. mpesa")
print("2. card")

choice = input('enter your choice')

if choice == '1':
    payement = Cash(name)
    # Cash(name).pay(amount)
elif choice == '2':
    payement = Card(name)
elif choice == '3':
    payement = Mpesa(name)
else:
    print('invalid option')
    exit()

procces_payement(payement,amount)
