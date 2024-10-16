# I simply made this to get a better understanding of how serializers use the TokenObtainSerializer class.


class GrandParentClass():
    variable = "I am a variable in GrandParentClass"

    def validate(self,data:str)->str:
        data+=" validated"
        return data

class ParentClass(GrandParentClass):
    functions = "Lets assume some things happened here"

    def validate(self,data:str)->str:
        super().validate(data)

        morefunctions = "Lets assume there's more functions going on here."

        return data

class ChildClass(ParentClass):
    def validate(self,data:str)->str:
        super().validate(data)

        evenmorefunctions = "Lets assume there's even more functions going on here."

        return data
    
