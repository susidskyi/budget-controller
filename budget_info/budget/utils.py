from datetime import datetime
from django.db.models import Q 


def create_date_filter(query_params):
    start_date = query_params.get('start_date', None)
    end_date = query_params.get('end_date', None)

    start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
    end_date = datetime.strptime(end_date, '%Y-%m-%d').date()

    _q = Q()

    if start_date:
        _q &= Q(created_at__date__gte=start_date)
    if end_date:
        _q &= Q(created_at__date__lte=end_date)

    return _q 