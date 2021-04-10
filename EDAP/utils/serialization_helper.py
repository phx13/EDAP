class SerializationHelper:

    @staticmethod
    def model_to_list(models):
        list_data = []
        for model in models:
            dict_data = {}
            for k, v in model.__dict__.items():
                if not k.startswith('_sa_instance_state'):
                    dict_data[k] = v
            list_data.append(dict_data)
        return list_data

    @staticmethod
    def join_model_to_list(join_models):
        list_data = []
        for obj1, obj2 in join_models:
            dict_data = {}
            for k1, v1 in obj1.__dict__.items():
                if not k1.startswith('_sa_instance_state'):
                    if not k1 in dict_data:
                        dict_data[k1] = v1
            for k2, v2 in obj2.__dict__.items():
                if not k2.startswith('_sa_instance_state'):
                    if not k2 in dict_data:
                        dict_data[k2] = v2
            list_data.append(dict_data)
        return list_data
