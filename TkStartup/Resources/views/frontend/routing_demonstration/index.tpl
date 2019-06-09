{extends file="parent:frontend/index/index.tpl"}

{block name='frontend_index_content_left'}
{/block} 


 {block name='frontend_index_content'}
 <h1>Working from {$currentAction}!</h1> 
 <a href="{url module="frontend" controller="routing_demonstration" action="$nextPage"}">
    {s name="RoutingDemonstrationNextPage"}{/s}
 </a>
 {/block}