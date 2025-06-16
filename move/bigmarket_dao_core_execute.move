module bigmarket_dao::core_execute {
    use bigmarket_dao::core_dao::{CoreDAO, execute_proposal};
    use std::vector;
    use std::option;
    use sui::tx_context::{self, TxContext};
    use sui::object::UID;
    use sui::clock;

    public struct CoreExecuteExtension has key, store {
        id: UID,
        sunset_height: u64,
        trusted_members: vector<address>,
    }

    public fun create_extension(
        ctx: &mut TxContext,
        sunset_height: u64,
        trusted_members: vector<address>
    ): CoreExecuteExtension {
        CoreExecuteExtension {
            id: sui::object::new(ctx),
            sunset_height,
            trusted_members,
        }
    }

    public fun add_trusted_member(ctx: &mut TxContext, ext: &mut CoreExecuteExtension, member: address) {
        let current_sender = tx_context::sender(ctx);
        assert!(current_sender == ext.trusted_members[0], 1003); // Assuming first is DAO admin
        vector::push_back(&mut ext.trusted_members, member);
    }

    public fun remove_trusted_member(ctx: &mut TxContext, ext: &mut CoreExecuteExtension, member: address) {
        let current_sender = tx_context::sender(ctx);
        assert!(current_sender == ext.trusted_members[0], 1003);

        let mut idx = 0;
        while (idx < vector::length(&ext.trusted_members)) {
            if (ext.trusted_members[idx] == member) {
                vector::swap_remove(&mut ext.trusted_members, idx);
                break;
            }
            idx = idx + 1;
        }
    }

    public fun execute_proposal_if_majority(
        ctx: &mut TxContext,
        core_dao: &mut CoreDAO,
        ext: &CoreExecuteExtension,
        proposal_id: UID
    ) {
        let is_trusted = vector::contains(&ext.trusted_members, tx_context::sender(ctx));
        assert!(is_trusted, 1004);

        assert!(clock::current_time() < ext.sunset_height, 1005);

        execute_proposal(ctx, core_dao, proposal_id);
    }
}
