import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { AccountTransferredEvent } from '../../domain/events/account-transferred.event';
import { CreateHistoryCommand } from '../commands/create-history.command';
import { Observable, map } from 'rxjs';

@Injectable()
export class AccountSaga {
  @Saga()
  accountTransferred = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(AccountTransferredEvent),
      map(
        ({ fromAccountId, toAccountId, amount }) =>
          new CreateHistoryCommand(fromAccountId, toAccountId, amount),
      ),
    );
}
