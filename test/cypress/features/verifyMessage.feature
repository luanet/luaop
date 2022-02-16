Feature: Verify Message

  Scenario: Verify the integrity of a signed message in textarea
    Given I login as genesis on devnet
    And I wait 2 seconds
    And I open signMessage modal
    When I fill test_Message in signMessageInput field
    And I click on nextBtn
    And I click on goBack
    Then signMessageInput should have value of test_Message
    When I click on nextBtn
    And I click on copyToClipboardBtn
    Then I should have the signed message in the clipboard
    And I open verifyMessage modal
    And I click on textAreaViewBtn
    When I paste clipboardValue in verifyMessageTextArea field
    Then I should have the clipboard value in the verify input textarea
    And I click on continueBtn
    And  I wait 2 seconds
    Then I see this title: The signature is correct

  Scenario: Verify the integrity of a tampered message in textArea view
    Given I login as genesis on devnet
    And I wait 2 seconds
    And I open verifyMessage modal
    And I click on textAreaViewBtn
    When I paste invalid_text in verifyMessageTextArea field
    And I click on continueBtn
    And I wait 2 seconds
    Then I see this title: The signature is incorrect

  Scenario: Verify the integrity of a signed message in input fields view
    Given I login as genesis on devnet
    And I wait 2 seconds
    And I open verifyMessage modal
    And I click on inputsViewBtn
    Then I fill test_message in verifyMessageInput
    Then I fill 167221bdf0af9f83fd9f0cda0aff264a836f4b85a0cf7ee5f6bec6029bb6d517 in verifyPublicKeyInput
    Then I fill 09392ac34e257b6cdb9bd4a73fc3901a073061c17b71ee4d4500fd600044eabd901b27584d59946f26a869a1e29ccdc87209272db545c02e43b4c083242ffc0d in verifySignatureInput
    And I click on continueBtn
    And I wait 2 seconds
    Then I see this title: The signature is correct

  Scenario: Verify the integrity of a tampered message in input fields view
    Given I login as genesis on devnet
    And I wait 2 seconds
    And I open verifyMessage modal
    And I click on inputsViewBtn
    Then I fill tampered_message in verifyMessageInput
    Then I fill 167221bdf0af9f83fd9f0cda0aff264a836f4b85a0cf7ee5f6bec6029bb6d517 in verifyPublicKeyInput
    Then I fill 112233abcde in verifySignatureInput
    And I click on continueBtn
    And I wait 2 seconds
    Then I see this title: The signature is incorrect
