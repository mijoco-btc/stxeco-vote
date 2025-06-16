module bigmarket_dao::proposal {
    public trait Proposal {
        public fun execute(ctx: &mut TxContext);
    }

    struct ExampleProposal has key {
        // Proposal-specific data
    }

    public fun execute(ctx: &mut TxContext) {
        // Implement execution logic
    }
}
