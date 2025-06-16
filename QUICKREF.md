# Sui CLI Command Guide

Summary of commands from [hello sui](https://move-book.com/your-first-move/hello-sui.html)

- sui client active-address
- sui client faucet
- sui client balance
- sui client publish --gas-budget 100000000 --json
- sui client ptb \
  --gas-budget 100000000 \
  --assign sender @$MY_ADDRESS \
  --move-call $PACKAGE_ID::todo_list::new \
  --assign list \
  --transfer-objects "[list]" sender
- sui client objects
- sui client ptb \
  --gas-budget 100000000 \
  --move-call $PACKAGE_ID::todo_list::add @$LIST_ID "'Finish the Hello, Sui chapter'"
- sui client object $LIST_ID --json
- sui client ptb \
  --gas-budget 100000000 \
  --move-call $PACKAGE_ID::todo_list::add @$LIST_ID "'Finish Concepts chapter'" \
  --move-call $PACKAGE_ID::todo_list::add @$LIST_ID "'Read the Move Basics chapter'" \
  --move-call $PACKAGE_ID::todo_list::add @$LIST_ID "'Learn about Object Model'" \
  --move-call $PACKAGE_ID::todo_list::remove @$LIST_ID 0
- sui client object $LIST_ID --json

Note PACKAGE_ID is returned in the response to publish move module

│ Published Objects: │
│ ┌── │
│ │ PackageID: 0x468daa33dfcb3e17162bbc8928f6ec73744bb08d838d1b6eb94eac99269b29fe │
│ │ Version: 1 │
│ │ Digest: Ein91NF2hc3qC4XYoMUFMfin9U23xQmDAdEMSHLae7MK │
│ │ Modules: todo_list │
│ └── │
