module tests::CoreExecuteTests {
    use bigmarket_dao::core_execute;
    use sui::tx_context::TxContext;

    #[test]
    public fun test_executive_action() {
        let mut ctx = TxContext::mock();
        let mut core_execute = core_execute::bootstrap(&mut ctx);

        // Add a mock executive team member
        core_execute::add_executive_team_member(&mut core_execute, @0x123, &mut ctx);

        // Assert the member is added
        assert!(core_execute::is_executive_team_member(&core_execute, @0x123), 1);
    }
}
