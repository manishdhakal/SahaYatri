import graphene
from api.schema import Query
class Query(graphene.ObjectType,Query):
    pass

schema = graphene.Schema(query=Query)