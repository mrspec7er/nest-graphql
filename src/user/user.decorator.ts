import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';

export const MessageDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return 'Message from Custom DEcorator';
  },
);

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    // With controller / rest api
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user;
    }

    // With resolver / graphql
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
