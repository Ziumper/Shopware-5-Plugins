{extends file="frontend/routing_demonstration/index.tpl"}

 {block name='frontend_index_content'}
 {$smarty.block.parent}
    <p>
    Additional text
    </p>

    {action module="widgets" controller="listing" action="topSeller"}
 {/block}
